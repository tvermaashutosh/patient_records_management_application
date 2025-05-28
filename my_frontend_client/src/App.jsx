import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import PatientContextHelper from "./context/PatientContextHelper"
import DoctorContextHelper from "./context/DoctorContextHelper"

import Navbar from "./comp/Navbar"

import Home from "./page/Home"
import Dashboard from "./page/Dashboard"
import AddPatient from "./page/AddPatient"
import Login from "./page/Login"

export default function () {
  return <>
    <ToastContainer position="top-right" autoClose={2000} />
    <Navbar />
    <div className="container mt-5 mb-5">
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<PatientContextHelper><Dashboard /></PatientContextHelper>} />
          <Route path="/add_patient" element={<PatientContextHelper><AddPatient /></PatientContextHelper>} />
          <Route path="/login" element={<DoctorContextHelper><Login /></DoctorContextHelper>} />
        </Route>
      </Routes>
    </div>
  </>
}