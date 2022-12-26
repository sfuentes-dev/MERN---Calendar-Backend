import express from 'express'
import dotenv from 'dotenv'
import router from './routes/auth.js'
import routerEvents from './routes/events.js'
import cors from 'cors'
import { dbConnection } from './database/config.js'

dotenv.config()

//Crear el servidor de Express
const app = express()

//Base de Datos
dbConnection()

// CORS
app.use(cors())

//Directorio Publico
app.use(express.static('public'))

//Lectura y parseo del body
app.use(express.json())

// Rutas
app.use('/api/auth', router)
app.use('/api/events', routerEvents)

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Server Running on Port ${process.env.PORT}`)
})
