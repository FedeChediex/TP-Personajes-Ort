import jwt from "jsunwebtoken"
import "dotenv/config"
import  {Router} from "express"
import Personaje from "./models/Personaje"
import { ObtenerPersonajes } from "./services/PersonajeService"

const router = Router()
const peliculaService = new PeliculaService();
const port = 3000














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
