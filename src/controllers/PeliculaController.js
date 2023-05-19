import { Router } from 'express'
import {PeliculaService} from '../services/PeliculaService.js'

const router = Router()
const peliculaService = new PeliculaService();

router.get('', async(req,res)=>
{
    console.log('Get all')
    const pelicula = await peliculaService.ObtenerPeliculas(req.query)
    return res.status(200).json(pelicula)
})
router.post('',async(req,res)=>
{
    console.log('Post')
    const pelicula = await peliculaService.AgregarPelicula(req.body)
    return res.status(200).json(pelicula)
})
router.delete('/:id', async(req,res)=>
{
    console.log('Delete')
    const pelicula = await peliculaService.EliminarPelicula(req.params.id)
    return res.status(200).json(pelicula)
})

router.put('/:id', async(req,res)=>
{
    console.log('Put')
    const pelicula = peliculaService.UpdatePelicula(req.body, req.params.id)
    return res.status(200).json(pelicula)
})
export default router
