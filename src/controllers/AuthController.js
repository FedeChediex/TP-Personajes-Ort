import { Router } from 'express'
import { AuthService } from '../services/AuthService.js'


const router = Router()
const authService = new AuthService()

router.get('/login', async (req, res) => {
    console.log(`This is a get operation`)

    const token = authService.getSignedToken()

    return res.status(200).json(token)
})

export default router