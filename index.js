import "dotenv/config"
import express from "express";

import PersonajeRouter from "./src/controllers/PersonajeController.js"
import PeliculaRouter  from "./src/controllers/PeliculaController.js";

import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const app = express();
const port = 3000

app.use(express.json());


app.use("/characters", PersonajeRouter);
app.use("/movies", PeliculaRouter);


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});