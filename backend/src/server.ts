require("dotenv").config();
import express from 'express'
import { router } from './routes'
import 'express-async-errors'
import cors from 'cors'
import mongoose from 'mongoose';


const app = express()

app.use(express.json())
app.use(cors())

app.use(router)

async function run() {
    try {
        mongoose.set('strictQuery', false)       
        await mongoose.connect(process.env.DATABASE_URL!);
        console.log("Conectado ao bd")
    } catch (error) {
        console.log(error)
    }
}

app.listen(3001, () => {
    console.log("Rodando na porta 3001");
});

run()