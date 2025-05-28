import mongoose from "mongoose"
import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import doctor from "./routes/doctor.js"
import patient from "./routes/patient.js"

dotenv.config()

const dbURL = process.env.DATABASEURL
await mongoose.connect(dbURL).then(() => {
  console.log("Connected to MongoDB successfully")
}).catch((e) => {
  console.error("Error connecting to MongoDB:", e)
})

const server = express()

server.use(cors())
server.use(express.json())

server.use("/doctor", doctor)
server.use("/patient", patient)

const port = process.env.PORT
server.listen(port, () => {
  console.log("Server is running on port", port)
})