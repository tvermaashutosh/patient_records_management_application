import express from "express"
import { body, validationResult } from "express-validator"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import Doctor from "../models/Doctor.js"

const router = express.Router()

router.post("/create",

  [body("name").exists(),
  body("email").isEmail(),
  body("password").isLength({ min: 8 })],

  async function (req, res) {
    try {
      const inputErrors = validationResult(req.body)
      if (!inputErrors.isEmpty()) {
        return res.status(400).json({ error: inputErrors.array() })
      }

      const duplicateDoctor = await Doctor.findOne({ email: req.body.email })
      if (duplicateDoctor) {
        return res.status(400).json({ error: "This email already exists" })
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
      req.body.password = hashedPassword
      const newDoctor = await Doctor.create(req.body)

      const skey = process.env.SECRET_KEY
      const token = jwt.sign({ _id: newDoctor._id }, skey)

      res.status(201).json({
        message: "Doctor added successfully",
        doctor: newDoctor,
        token: token
      })
    }
    catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
)

router.post("/login",

  [body("email").isEmail(),
  body("password").isLength({ min: 8 })],

  async function (req, res) {
    try {
      const inputErrors = validationResult(req)
      if (!inputErrors.isEmpty()) {
        return res.status(400).json({ error: inputErrors.array() })
      }

      const doctor = await Doctor.findOne({ email: req.body.email })
      if (!doctor) {
        return res.status(401).json({ error: "Invalid credentials" })
      }

      const isPasswordValid = await bcrypt.compare(req.body.password, doctor.password)
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" })
      }

      const skey = process.env.SECRETKEY
      const token = jwt.sign({ _id: doctor._id }, skey)

      res.status(200).json({
        message: "Login successful",
        doctor: doctor,
        token: token
      })
    }
    catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
)

export default router