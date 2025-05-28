import express from "express"
import { body, validationResult } from "express-validator"

import decodeTokenPayload from "../middleware/decodeTokenPayload.js"

import Patient from "../models/Patient.js"
import Doctor from "../models/Doctor.js"

const router = express.Router()

router.post("/read",

  async function (req, res) {
    try {
      const page = parseInt(req.query?.page) || 1
      const pageSize = parseInt(req.query?.page_size) || 10
      const matchAND = []

      let name = req.body?.name
      name = name?.trim()
      if (name) {
        matchAND.push({
          name: { $regex: name }
        })
      }

      let registrationDate = req.body?.registrationDate
      registrationDate = registrationDate?.trim()
      if (registrationDate) {
        const tm = new Date(registrationDate),
          day = tm.getDate(),
          mon = tm.getMonth() + 1,
          yea = tm.getFullYear()

        matchAND.push({
          $expr: {
            $and: [
              { $eq: [{ $dayOfMonth: "$registrationDate" }, day] },
              { $eq: [{ $month: "$registrationDate" }, mon] },
              { $eq: [{ $year: "$registrationDate" }, yea] }
            ]
          }
        })
      }

      const listPipeline = []
      if (matchAND.length) {
        listPipeline.push({ $match: { $and: matchAND } })
      }

      listPipeline.push({ $sort: { registrationDate: -1 } })
      listPipeline.push({ $skip: (page - 1) * pageSize })
      listPipeline.push({ $limit: pageSize })

      const patientArray = await Patient.aggregate(listPipeline)

      const countPipeline = []
      if (matchAND.length) {
        countPipeline.push({ $match: { $and: matchAND } })
      }

      countPipeline.push({ $count: "totalCount" })

      const tmp = await Patient.aggregate(countPipeline)
      const totalCount = tmp[0]?.totalCount ?? 0
      const totalPages = Math.ceil(totalCount / pageSize)

      res.status(200).json({
        patientArray,
        currentPage: page,
        pageSize: pageSize,
        totalPages: totalPages,
        totalCount: totalCount
      })
    }
    catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
)

router.post("/create",

  [body("name").isString(),
  body("sex").isString().isIn(["M", "F", "O"]),
  body("age").isNumeric(),
  body("address").isString(),
  body("payment").isNumeric(),
  body("balance").isNumeric(),
  body("registrationDate").isISO8601()],

  decodeTokenPayload,

  async function (req, res) {
    try {
      const inputErrors = validationResult(req)
      if (!inputErrors.isEmpty()) {
        return res.status(400).json({ error: inputErrors.array() })
      }

      const doctor = await Doctor.findById(req.doctor_id)
      if (!doctor) {
        return res.status(401).json({ error: "Invalid credentials" })
      }

      const patient = await Patient.create(req.body)

      res.status(201).json({
        message: "Patient added successfully",
        patient: patient
      })
    }
    catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
)

router.put("/update/:_id",

  [body("name").isString(),
  body("sex").isString().isIn(["M", "F", "O"]),
  body("age").isNumeric(),
  body("address").isString(),
  body("payment").isNumeric(),
  body("balance").isNumeric(),
  body("registrationDate").isISO8601()],

  decodeTokenPayload,

  async function (req, res) {
    try {
      const inputErrors = validationResult(req)
      if (!inputErrors.isEmpty()) {
        return res.status(400).json({ error: inputErrors.array() })
      }

      const doctor = await Doctor.findById(req.doctor_id)
      if (!doctor) {
        return res.status(401).json({ error: "Invalid credentials" })
      }

      const patient = await Patient.findByIdAndUpdate(req.params._id, req.body, { new: true })
      if (!patient) {
        return res.status(404).json({ error: "Patient not found" })
      }

      res.status(200).json({
        message: "Patient updated successfully",
        patient: patient
      })
    }
    catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
)

router.delete("/delete/:_id",

  decodeTokenPayload,

  async function (req, res) {
    try {
      const doctor = await Doctor.findById(req.doctor_id)
      if (!doctor) {
        return res.status(401).json({ error: "Invalid credentials" })
      }

      const patient = await Patient.findByIdAndDelete(req.params._id)
      if (!patient) {
        return res.status(404).json({ error: "Patient not found" })
      }

      res.status(200).json({
        message: "Patient deleted successfully",
        patient: patient
      })
    }
    catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
)

export default router