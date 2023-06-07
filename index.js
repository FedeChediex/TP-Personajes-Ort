import "dotenv/config"
import express from "express"
import passport from 'passport'
import { jwtStrategy } from './src/common/jwt.strategy.js'
import AuthRouter from './src/controllers/AuthController.js'
import PersonajeRouter from "./src/controllers/PersonajeController.js"
import PeliculaRouter  from "./src/controllers/PeliculaController.js"


const app = express()
const port = 3000

app.use(express.json())
passport.use(jwtStrategy)
app.use(passport.initialize())

app.use("/auth", AuthRouter)
app.use("/characters", PersonajeRouter)
app.use("/movies", PeliculaRouter)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})













