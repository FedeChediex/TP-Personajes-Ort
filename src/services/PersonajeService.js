import sql from 'mssql'
import configDB from '../../DB.js'
import 'dotenv/config'

export class PersonajeService {

    AgregarPersonaje = async (personaje) => {
        var error = "Algun Atributo no fue enviado"
        if (!personaje.Nombre || !personaje.Historia || !personaje.Peso || !personaje.Edad || !personaje.Imagen) {
            return error
        }

        const connection = await sql.connect(configDB)
        const results = await connection.request()

            .input("pNombre", sql.VarChar, personaje.Nombre)
            .input("pHistoria", sql.VarChar, personaje.Historia)
            .input("pPeso", sql.Float, personaje.Peso)
            .input("pEdad", sql.Int, personaje.Edad)
            .input("pImagen", sql.VarChar, personaje.Imagen)

            .query('INSERT INTO Personaje (Nombre, Historia, Peso, Edad, Imagen) VALUES (@pNombre, @pHistoria, @pPeso, @pEdad, @pImagen)')

        console.log(results)
    }

    ObtenerPersonajes = async (req) => {
        const name = req?.name?? null
        const age = req?.age?? null

        const select = 'SELECT P.Nombre , P.Imagen , P.Id FROM Personaje P  '
        var where = ''
        var join = "LEFT JOIN PeliculaPersonaje AS PX ON P.id = PX.Id_personaje LEFT JOIN Pelicula AS Pe ON PX.Id_pelicula = Pe.id "
        if (req.name) {
            where = where +  `Where Nombre LIKE '${name}%' `
            if (req.age) {
                where = where + `AND Edad LIKE '${age}%' `
            }
            if (req.movie) {
                where = where + ' AND Pelicula.Id = @pId'
            }

        }
        else if (req.age) {
            where = where + `Where Edad LIKE '${age}%' `
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
        
        const conn = await sql.connect(configDB)
        const results = await conn.request()
            .input("pNombre", sql.VarChar, req.name)
            .input("pEdad", sql.Int, req.age)
            .input("pId", sql.Int, req.movie)
            .query(procedure)
        return results.recordset
    }

    ObtenerPersonajeById = async (Id) => {
        const conn = await sql.connect(configDB)

        const results = await conn.request()
            .input("pId", sql.Int, Id)
            .query("SELECT P.*, STRING_AGG(Pe.Titulo, ', ') AS RelatedMovies FROM Personaje AS P LEFT JOIN PeliculaPersonaje AS PX ON P.id = PX.Id_personaje LEFT JOIN Pelicula AS Pe ON PX.Id_pelicula = Pe.id WHERE P.id = @pId GROUP BY P.Id, P.Imagen, P.Edad, P.Historia, P.Peso,P.Nombre")

        return results.recordset[0]
    }
    EliminarPersonaje = async (Id) => {
        const conn = await sql.connect(configDB)
        const results = await conn.request().input("pId", sql.Int, Id)
            .query('DELETE FROM PeliculaPersonaje WHERE Id_personaje = @pId DELETE FROM Personaje WHERE Id = @pId')
        console.log(results)
    }
   UpdatePersonaje = async (personaje, id) => {
        var P = await this.ObtenerPersonajeById(id)
        
        const conn = await sql.connect(configDB)
        const result = await conn.request()
            .input("pId", sql.Int, id)
            .input("pNombre", sql.VarChar, personaje?.Nombre ?? P.Nombre)
            .input("pHistoria", sql.VarChar, personaje?.Historia ?? P.Historia)
            .input("pPeso", sql.Float, personaje?.Peso ?? P.Peso)
            .input("pEdad", sql.Int, personaje?.Edad ?? P.Edad)
            .input("pImagen", sql.VarChar, personaje?.Imagen ?? P.Imagen)
            .query('UPDATE Personaje SET Nombre = @pNombre, Historia = @pHistoria, Peso =  @pPeso, Edad = @pEdad, Imagen = @pImagen WHERE Id = @pId')
        console.log(result)
    }

}
