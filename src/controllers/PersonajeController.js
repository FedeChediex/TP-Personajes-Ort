import { Router } from 'express'
import { PersonajeService } from '../services/PersonajeService.js'

const router = Router()
const personajeService = new PersonajeService();

router.get('', async (req, res) => {
    console.log('Get all')
    const personaje = await personajeService.ObtenerPersonajes(req.query)
    return res.status(200).json(personaje)
})

router.get('/:id', async (req, res) => {
    console.log('Get by ID')
    const id = req.params.id
    const personaje = await personajeService.ObtenerPersonajeById(id)
    return res.status(200).json(personaje)
})

router.post('', async (req, res) => {
    console.log('Post')
    const personaje = await personajeService.AgregarPersonaje(req.body)
    return res.status(200).json(personaje)
})

router.delete('/:id', async (req, res) => {
    console.log('Delete')
    const personaje = await personajeService.EliminarPersonaje(req.params.id)
    return res.status(200).json(personaje)
})

router.put('/:id', async (req, res) => {
    console.log('Put')
    const personaje = personajeService.UpdatePersonaje(req.body, req.params.id)
    return res.status(200).json(personaje)
})
export default router