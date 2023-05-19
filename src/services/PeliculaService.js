import sql from 'mssql';
import configDB from '../models/DB.js'
import 'dotenv/config'

export class PeliculaService {
    
    AgregarPelicula = async (pelicula) => {
        const connection = await sql.connect(configDB)


        const results = await connection.request()
            .input("pTitulo", sql.VarChar, pelicula.titulo)
            .input("pFecha", sql.Date, pelicula.fecha)
            .input("pCalificacion", sql.Int, pelicula.calificacion)
            .input("pImagen", sql.VarChar, pelicula.imagen)

            .query('INSERT INTO Pelicula (Titulo, Fecha, Calificacion, Imagen) VALUES (@pTitulo, @pFecha, @pCalificacion, @pImagen)');

        console.log(results);
    }

    EliminarPelicula = async (Id) => {
        const conn = await sql.connect(configDB);
        const results = await conn.request().input("pId", sql.Int, Number(Id))
            .query('DELETE FROM Pelicula WHERE Id = @pId');

        console.log(results);
    }

    UpdatePelicula = async (pelicula, id) => {
        const conn = await sql.connect(configDB);
        const result = await conn.request()
            .input('pId', sql.Int, id)
            .input('pTitulo', sql.VarChar, pelicula.titulo)
            .input('pFecha', sql.Date, pelicula.fecha)
            .input('pCalificacion', sql.Int, pelicula.calificacion)
            .input("pImagen", sql.VarChar, pelicula.imagen)
            .query('UPDATE Pelicula SET Titulo = @pTitulo,Fecha =  @pFecha, Calificacion = @pCalificacion, Imagen = @pImagen WHERE Id = @pId')
        console.log(result);
    }
    ObtenerPeliculas = async (req) => {
        console.log(req.name)
        var where = " "
        
        if (req.name != null) {
            where = 'WHERE Titulo = @pTitulo'
        }
        var procedure = 'SELECT Titulo, Fecha, Imagen, Id FROM Pelicula ' + where
        console.log(procedure)
        const conn = await sql.connect(configDB);
        const results = await conn.request()
        
        .input('pTitulo', sql.VarChar, req.name)
        .query(procedure);

        return results.recordset;
    }
}
