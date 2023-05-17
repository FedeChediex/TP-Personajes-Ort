import sql from 'mssql'
import configDB from '../models/DB.js'
import 'dotenv/config'

export class PersonajeService {
    AgregarPersonaje = async (personaje) => {
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
        console.log(req.name)
        console.log(req.age)
        console.log(req.age)
        var where = "Where "
        if (req.name) {
            where =+ 'Nombre = @pNombre'
            
        }
        if (req.age) {
            
        }
        if (req.movie) {
            
        }
        const conn = await sql.connect(configDB);
        const results = await conn.request()
        .input("pNombre", sql.VarChar, req.name)
        .input("pEdad", sql.VarChar, req.age)
        .input("pNombre", sql.VarChar, req.name)
        .query('SELECT Nombre, Imagen, Id FROM Personaje ' + where);
        
        

        return results.recordset;
    }
    ObtenerPersonajeById = async (Id) => {
        const conn = await sql.connect(configDB);
        console.log(Id)
        const results = await conn.request().input("pId", sql.Int, Number(Id))
            .query('SELECT * FROM Personaje Left JOIN PeliculaPersonaje ON PeliculaPersonaje.Id_personaje = Personaje.Id Left JOIN Pelicula ON PeliculaPersonaje.Id_pelicula = Pelicula.Id WHERE Personaje.Id = @pId' )
            
        return results.recordset;
    }
    EliminarPersonaje = async (Id) => {
        const conn = await sql.connect(configDB);
        const results = await conn.request().input("pId", sql.Int, Number(Id))
            .query('DELETE FROM Personaje WHERE Id = @pId')
        console.log(results);
    }
    UpdatePersonaje = async (personaje, id) => {
        const conn = await sql.connect(configDB);
        const result = await conn.request()
            .input('pId', sql.Int, id)
            .input('pNombre', sql.VarChar, personaje.nombre)
            .input('pPeso', sql.Float, personaje.peso)
            .input('pEdad', sql.Int, personaje.edad)
            .input('pHistoria', sql.VarChar, personaje.historia)
            .input("pImagen", sql.VarChar, personaje.imagen)
            .query('UPDATE Personaje SET Nombre = @pNombre, Historia = @pHistoria, Peso =  @pPeso, Edad = @pEdad, Imagen = @pImagen WHERE Id = @pId')
        console.log(result);
    }
}