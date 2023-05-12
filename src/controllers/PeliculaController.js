import { Router } from 'express'
import {PeliculaService} from '../services/PeliculaService.js'

const router = Router()
const peliculaService = new PeliculaService();

router.get('', async(req,res)=>
{
    console.log('Get all')
    const pelicula = await peliculaService.ObtenerPeliculas()
    return res.status(200).json(peliculas)
})


export default router
