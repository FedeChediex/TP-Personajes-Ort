import "dotenv/config"
import express from "express";
import passport from 'passport';
import { jwtStrategy } from './src/common/jwt.strategy.js';

import PersonajeRouter from "./src/controllers/PersonajeController.js"
import PeliculaRouter  from "./src/controllers/PeliculaController.js";

const app = express();
const port = 3000

app.use(express.json());
passport.use(jwtStrategy);
app.use(passport.initialize());

app.use("/characters", PersonajeRouter);
app.use("/movies", PeliculaRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});











/*
const getRandomString = () => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 18; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  };
  
  const getSignedToken = () => {
    const userId = getRandomString();
    const userMail = `${userId}@example.com`;
    const token = jwt.sign(
      {
        payload: "custom payload",
        userEmail: userMail,
      },
      process.env.AUTH0_HS256_KEY,
      {
        issuer: "http://pizza.ort/",
        subject: userId,
        audience: ["http://localhost/"],
        expiresIn: 60 * 24 * 24,
      }
    );
  
    return token;
  }*/
