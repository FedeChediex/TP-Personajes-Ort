import sql from 'mssql'
import configDB from '../../DB.js'
import 'dotenv/config'

export class PeliculaService {

    AgregarPelicula = async (pelicula) => {
        const error = "Algun atributo no fue enviado"
        const connection = await sql.connect(configDB)
        if (!pelicula.Titulo || !pelicula.Fecha || !pelicula.Calificacion || !pelicula.Imagen || pelicula.Calificacion > 5 || pelicula.Calificacion < 1) {
            return error
        }

        const results = await connection.request()
            .input("pTitulo", sql.VarChar, pelicula.Titulo)
            .input("pFecha", sql.Date, pelicula.Fecha)
            .input("pCalificacion", sql.Int, pelicula.Calificacion)
            .input("pImagen", sql.VarChar, pelicula.Imagen)

            .query('INSERT INTO Pelicula (Titulo, Fecha, Calificacion, Imagen) VALUES (@pTitulo, @pFecha, @pCalificacion, @pImagen)')

        console.log(results)
    }

    EliminarPelicula = async (Id) => {
        const conn = await sql.connect(configDB)
        const results = await conn.request().input("pId", sql.Int, Number(Id))
            .query('DELETE FROM PeliculaPersonaje WHERE Id_pelicula = @pId DELETE FROM Pelicula WHERE Id = @pId')
            

        console.log(results)
    }

    UpdatePelicula = async (pelicula, id) => {

        var P = await this.ObtenerPeliculaById(id)

        const conn = await sql.connect(configDB)
        const result = await conn.request()
            .input('pId', sql.Int, id)
            .input('pTitulo', sql.VarChar, pelicula?.Titulo ?? P.Titulo)
            .input('pFecha', sql.Date, pelicula?.Fecha ?? P.Fecha)
            .input('pCalificacion', sql.Int, pelicula?.Calificacion ?? P.Calificacion)
            .input("pImagen", sql.VarChar, pelicula?.Imagen ?? P.Imagen)
            .query('UPDATE Pelicula SET Titulo = @pTitulo, Fecha =  @pFecha, Calificacion = @pCalificacion, Imagen = @pImagen WHERE Id = @pId')
            console.log(results)
    }
    ObtenerPeliculas = async (req) => {
        
        var where = " "
        var order = " "
        const title = req?.name?? null

        if (req.name) {
            where = `WHERE Titulo LIKE '${title}%' `
        }
        if (req.order) {
            req.order = req.order.toUpperCase()
            if (req.order == 'DESC') {

                order = 'order by Fecha DESC'
            }
            else {
                order = 'order by Fecha ASC'
            }
        }

        var procedure = 'SELECT Titulo, Fecha, Imagen, Id FROM Pelicula ' + where + order
        
        const conn = await sql.connect(configDB)
        const results = await conn.request()

            .input('pTitulo', sql.VarChar, req.name)
            .input('pFecha', sql.Date, req.Date)
            .query(procedure)

        return results.recordset
    }
    ObtenerPeliculaById = async (Id) => {
        const conn = await sql.connect(configDB)
        
        const results = await conn.request()
            .input("pId", sql.Int, Number(Id))
            .query("SELECT Peli.*, String_AGG(P.Nombre, ', ') As RelatedCharacters FROM Pelicula AS Peli LEFT JOIN PeliculaPersonaje AS PX ON Peli.id = PX.Id_pelicula LEFT JOIN Personaje AS P ON PX.Id_personaje = P.id WHERE Peli.id = @pId GROUP BY Peli.Calificacion, Peli.Fecha, Peli.Id, Peli.Imagen, Peli.Titulo")

        return results.recordset[0]
    }
}