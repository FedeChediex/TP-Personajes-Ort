import sql from 'mssql'
import configDB from '../../DB.js'
import 'dotenv/config'

export class PersonajeService {

    AgregarPersonaje = async (personaje) => {
        var error = "Algun Atributo no fue enviado"
        if (!personaje.nombre || !personaje.historia || !personaje.peso || !personaje.edad || !personaje.imagen) {
            return error
        }

        const connection = await sql.connect(configDB)
        const results = await connection.request()

            .input("pNombre", sql.VarChar, personaje.nombre)
            .input("pHistoria", sql.VarChar, personaje.historia)
            .input("pPeso", sql.Float, personaje.peso)
            .input("pEdad", sql.Int, personaje.edad)
            .input("pImagen", sql.VarChar, personaje.imagen)

            .query('INSERT INTO Personaje (Nombre, Historia, Peso, Edad, Imagen) VALUES (@pNombre, @pHistoria, @pPeso, @pEdad, @pImagen)');

        console.log(results);
    }

    ObtenerPersonajes = async (req) => {


        const select = 'SELECT P.Nombre , P.Imagen , P.Id FROM Personaje P  '
        var where = ''
        var join = "LEFT JOIN PeliculaPersonaje AS PX ON P.id = PX.Id_personaje LEFT JOIN Pelicula AS Pe ON PX.Id_pelicula = Pe.id "
        if (req.name) {
            where = where + ' Where Nombre = @pNombre'
            if (req.age) {
                where = where + ' AND Edad = @pEdad'
            }
            if (req.movie) {
                where = where + ' AND Pelicula.Id = @pId'
            }

        }
        else if (req.age) {
            where = where + 'Where Edad = @pEdad'
            if (req.movie) {
                where = where + ' AND Pelicula.Id = @pId'
            }

        }
        else if (req.movie) {
            where = where + 'Where Pelicula.Id = @pId'

        }
        else {
            join = ""
        }

        where = where + " GROUP BY P.Id, P.Imagen,P.Nombre"
        const procedure = select + join + where

        
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

        const results = await conn.request()
            .input("pId", sql.Int, Id)
            .query("SELECT P.*, STRING_AGG(Pe.Titulo, ', ') AS RelatedMovies FROM Personaje AS P LEFT JOIN PeliculaPersonaje AS PX ON P.id = PX.Id_personaje LEFT JOIN Pelicula AS Pe ON PX.Id_pelicula = Pe.id WHERE P.id = @pId GROUP BY P.Id, P.Imagen, P.Edad, P.Historia, P.Peso,P.Nombre")

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
            .input("pId", sql.Int, id)
            .input("pNombre", sql.VarChar, personaje?.nombre ?? P.nombre)
            .input("pHistoria", sql.VarChar, personaje?.historia ?? P.historia)
            .input("pPeso", sql.Float, personaje?.peso ?? P.peso)
            .input("pEdad", sql.Int, personaje?.edad ?? P.edad)
            .input("pImagen", sql.VarChar, personaje?.imagen ?? P.imagen)
            .query('UPDATE Personaje SET Nombre = @pNombre, Historia = @pHistoria, Peso =  @pPeso, Edad = @pEdad, Imagen = @pImagen WHERE Id = @pId')
        console.log(result);
    }

}