import sql from 'mssql'
import configDB from '../../DB.js'
import 'dotenv/config'

export class PeliculaService {
    
    AgregarPelicula = async (pelicula) => {
        const connection = await sql.connect(configDB)


        const results = await connection.request()
            .input("pTitulo", sql.VarChar, pelicula.titulo)
            .input("pFecha", sql.Date, pelicula.fecha)
            .input("pCalificacion", sql.Int, pelicula.calificacion)
            .input("pImagen", sql.VarChar, pelicula.imagen)

            .query('INSERT INTO Pelicula (Titulo, Fecha, Calificacion, Imagen) VALUES (@pTitulo, @pFecha, @pCalificacion, @pImagen)')

        console.log(results)
    }

    EliminarPelicula = async (Id) => {
        const conn = await sql.connect(configDB)
        const results = await conn.request().input("pId", sql.Int, Number(Id))
            .query('DELETE FROM Pelicula WHERE Id = @pId')

        console.log(results)
    }

     UpdatePelicula = async (pelicula, id) => {
        var error = "Algun Atributo no fue enviado"
        var P = await this.ObtenerPeliculaById(id)
       
        
        const conn = await sql.connect(configDB)
        const result = await conn.request()
            .input('pId', sql.Int, id)
            .input('pTitulo', sql.VarChar, pelicula?.titulo?? P.titulo)
            .input('pFecha', sql.Date, pelicula?.fecha?? P.fecha)
            .input('pCalificacion', sql.Int, pelicula?.calificacion?? P.calificacion)
            .input("pImagen", sql.VarChar, pelicula?.imagen?? P.imagen)
            .query('UPDATE Pelicula SET Titulo = @pTitulo,Fecha =  @pFecha, Calificacion = @pCalificacion, Imagen = @pImagen WHERE Id = @pId')
        console.log(result);
    }
    ObtenerPeliculas = async (req) => {
        console.log(req.name)
        console.log(req.order)
        var where = " "
        var order = " "
        req.order = req.order.toUpperCase()        

        if (req.name) {
            where = 'WHERE Titulo = @pTitulo'
        }
        if (req.order) {
            if (req.order == 'DESC') {

                order = 'order by Fecha DESC'
            }
            else{
                order = 'order by Fecha ASC'
            }
        }
        
        var procedure = 'SELECT Titulo, Fecha, Imagen, Id FROM Pelicula ' + where + order
        console.log(procedure)
        const conn = await sql.connect(configDB)
        const results = await conn.request()

            .input('pTitulo', sql.VarChar, req.name)
            .input('pFecha', sql.Date, req.Date)
            .query(procedure)

        return results.recordset
    }
    ObtenerPeliculaById = async (Id) => {
        const conn = await sql.connect(configDB)
        console.log(Id)
        const results = await conn.request()
        .input("pId", sql.Int, Number(Id))
        .query("SELECT Peli.*, String_AGG(P.Nombre, ', ') As RelatedCharacters FROM Pelicula AS Peli LEFT JOIN PeliculaPersonaje AS PX ON Peli.id = PX.Id_pelicula LEFT JOIN Personaje AS P ON PX.Id_personaje = P.id WHERE Peli.id = @pId GROUP BY Peli.Calificacion, Peli.Fecha, Peli.Id, Peli.Imagen, Peli.Titulo")

        return results.recordset[0]
    }
}
