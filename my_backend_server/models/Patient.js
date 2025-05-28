import mongoose from "mongoose"

export default mongoose.model("Patient", new mongoose.Schema({
  name: { type: String, required: true },
  sex: { type: String, required: true },
  age: { type: Number, required: true },
  mobile: { type: Number },
  address: { type: String, required: true },
  pmh: { type: String },
  workDone: { type: String },
  payment: { type: Number, required: true },
  balance: { type: Number, required: true },
  nextAppointment: { type: Date },
  registrationDate: { type: Date, required: true }
}))