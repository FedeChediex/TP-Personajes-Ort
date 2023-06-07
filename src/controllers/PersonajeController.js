import { Router } from 'express'
import { PersonajeService } from '../services/PersonajeService.js'
import { Authenticate } from '../common/jwt.strategy.js'

const router = Router()
const personajeService = new PersonajeService()

router.get('',  Authenticate,async (req, res) => {
    console.log('Get all')
    const personaje = await personajeService.ObtenerPersonajes(req.query)
    return res.status(200).json(personaje)
})

router.get('/:id', Authenticate, async (req, res) => {
    console.log('Get by ID')
    const id = req.params.id
    const personaje = await personajeService.ObtenerPersonajeById(id)
    return res.status(200).json(personaje)
})

router.post('', Authenticate, async (req, res) => {
    console.log('Post')
    const personaje = await personajeService.AgregarPersonaje(req.body)
    return res.status(200).json(personaje)
})

router.delete('/:id', Authenticate, async (req, res) => {
    console.log('Delete')
    const personaje = await personajeService.EliminarPersonaje(req.params.id)
    return res.status(200).json(personaje)
})

router.put('/:id', Authenticate, async (req, res) => {
    console.log('Put')
    const personaje = personajeService.UpdatePersonaje(req.body, req.params.id)
    return res.status(200).json(personaje)
})
export default router