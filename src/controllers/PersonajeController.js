import { Router } from 'express'
import {PersonajeService} from '../services/PersonajeService.js'

const router = Router()
const personajeService = new PersonajeService();

router.get('', async(req,res)=>
{
    console.log('Get all')
    const personaje = await personajeService.ObtenerPersonajes()
    return res.status(200).json(personaje)
})


export default router