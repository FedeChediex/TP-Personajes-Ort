import sql from 'mssql'
import configDB from '../../DB.js'
import 'dotenv/config'

export class PersonajeService {
   
    AgregarPersonaje = async (personaje) => {
        var error = "Algun Atributo no fue enviado"
        if(!personaje.nombre || !personaje.historia || !personaje.peso || !personaje.edad || !personaje.imagen)
        {
            return error
        }

        const connection = await sql.connect(configDB)
        const results = await connection.request()
        
            .input("pNombre", sql.VarChar, personaje.nombre)
            .input("pHistoria", sql.VarChar, personaje.historia )           
            .input("pPeso", sql.Float, personaje.peso )
            .input("pEdad", sql.Int, personaje.edad )
            .input("pImagen", sql.VarChar, personaje.imagen)
        
            .query('INSERT INTO Personaje (Nombre, Historia, Peso, Edad, Imagen) VALUES (@pNombre, @pHistoria, @pPeso, @pEdad, @pImagen)');

        console.log(results);
    }

    ObtenerPersonajes = async (req) => {
        console.log(req.name)
        console.log(req.age)
        console.log(req.movie)

        const select = 'SELECT P.Nombre , P.Imagen , P.Id FROM Personaje P  '
        var where = ''
        var join = ''
        if (req.name) {
            where = where + ' Where Nombre = @pNombre'
            if (req.age) {
                where = where + ' AND Edad = @pEdad'
            }
            if (req.movie) {
                where = where + ' AND Pelicula.Id = @pId'
            }
            join = " INNER JOIN PeliculaPersonaje ON PeliculaPersonaje.Id_personaje = P.Id INNER JOIN Pelicula ON PeliculaPersonaje.Id_pelicula = Pelicula.Id "
        }
        else if (req.age) {
            where = where + 'Where Edad = @pEdad'
            if (req.movie) {
                where = where + ' AND Pelicula.Id = @pId'
            }
            join = " INNER JOIN PeliculaPersonaje ON PeliculaPersonaje.Id_personaje = P.Id INNER JOIN Pelicula ON PeliculaPersonaje.Id_pelicula = Pelicula.Id "
        }
        else if (req.movie) {
            where = where + 'Where Pelicula.Id = @pId'
            console.log(where)
            join = " INNER JOIN PeliculaPersonaje ON PeliculaPersonaje.Id_personaje = P.Id INNER JOIN Pelicula ON PeliculaPersonaje.Id_pelicula = Pelicula.Id "
        }


        const procedure = select + join + where
        console.log(procedure)

        const conn = await sql.connect(configDB);
        const results = await conn.request()
            .input("pNombre", sql.VarChar, req.name)
            .input("pEdad", sql.Int, req.age)
            .input("pId", sql.Int, req.movie)
            .query(procedure)
        return results.recordset;
    }

    ObtenerPersonajeById = async (Id) => {
        const conn = await sql.connect(configDB);
        console.log(Id)
        const results = await conn.request()
        .input("pId", sql.Int, Id)
        .query('SELECT P.Imagen, P.Nombre, P.Edad, P.Peso, P.Historia, Peli.Titulo FROM Personaje P INNER JOIN PeliculaPersonaje ON PeliculaPersonaje.Id_personaje = Personaje.Id INNER JOIN Pelicula Peli ON PeliculaPersonaje.Id_pelicula = Pelicula.Id WHERE Personaje.Id = @pId')

        return results.recordset;
    }
    EliminarPersonaje = async (Id) => {
        const conn = await sql.connect(configDB);
        const results = await conn.request().input("pId", sql.Int, Id)
            .query('DELETE FROM Personaje WHERE Id = @pId')
        console.log(results);
    }
    UpdatePersonaje = async (personaje, id) => {
        var P = this.ObtenerPersonajeById(id)
        
        const conn = await sql.connect(configDB);
        const result = await conn.request()
        .input("pId",sql.Int, id)
        .input("pNombre", sql.VarChar, personaje?.nombre?? P.nombre)
        .input("pHistoria", sql.VarChar, personaje?.historia?? P.historia)
        .input("pPeso", sql.Float, personaje?.peso?? P.peso )
        .input("pEdad", sql.Int, personaje?.edad?? P.edad)
        .input("pImagen", sql.VarChar, personaje?.imagen?? P.imagen)
            .query('UPDATE Personaje SET Nombre = @pNombre, Historia = @pHistoria, Peso =  @pPeso, Edad = @pEdad, Imagen = @pImagen WHERE Id = @pId')
        console.log(result);
    }

}