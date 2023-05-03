import Personaje from '../models/Personaje'
import sql from 'mssql';
import configDB from '../models/DB.js'

export const AgregarPersonaje = async (personaje) =>
{
   const connection = await sql.connect(configDB)
   
   
   const results = await connection.request()
   .input("pNombre", sql.VarChar, personaje.nombre)
   .input("pHistoria", sql.VarChar, personaje.historia)
   .input("pPeso", sql.Float, personaje.peso)
   .input("pEdad", sql.Int, personaje.edad)
   .input("pImagen", sql.VarChar, personaje.Imagen)
   
   .query('INSERT INTO Personaje (Nombre, Historia, Peso, Edad, Imagen) VALUES (@pNombre, @pHistoria, @pPeso, @pEdad, @pImagen)');

   console.log(results);
}

export const ObtenerPersonajes = async () => {
    const conn = await sql.connect(configDB);
    const results = await conn.request().query('SELECT Nombre, Imagen, Id FROM Personajes');

    return results.recordset;
}
export const ObtenerPersonajesById = async (Id) => {
    const conn = await sql.connect(configDB);
    console.log(Id)
    const results = await conn.request().input("pId", sql.Int, Number(Id))
    .query('SELECT * FROM Personajes WHERE Id = @pId');

    return results.recordset;
}
export const EliminarPersonaje = async (Id) => {
    const conn = await sql.connect(configDB);
    const results = await conn.request().input("pId", sql.Int, Number(Id))
    .query('DELETE FROM Personajes WHERE Id = @pId');

    console.log(results);
}
export const UpdatePersonaje = async (personaje, id) => {
    const conn = await sql.connect(configDB);
    const result = await conn.request()
    .input('pId', sql.Int, id)
    .input('pNombre', sql.VarChar, personaje.nombre)
    .input('pPeso', sql.Float, personaje.peso)
    .input('pEdad', sql.Int, personaje.edad)
    .input('pHistoria', sql.VarChar, personaje.historia)
    .input("pImagen", sql.VarChar, personaje.Imagen)
    .query('UPDATE Personajes SET Nombre = @pNombre, Historia = @pHistoria, Peso =  @pPeso, Edad = @pEdad, Imagen = @pImagen WHERE Id = @pId')
    console.log(result);
}