import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { toast } from "react-toastify"

import DoctorContext from "../context/DoctorContext"

export default function () {

  function onInputChange(e) {
    setDoctor({ ...doctor, [e.target.name]: e.target.value })
  }

  const [doctor, setDoctor] = useState({})

  const context = useContext(DoctorContext)
  const navigate = useNavigate()
  async function onLoginClick() {
    const success = await context.loginDoctor(doctor.email, doctor.password)
    if (success) {
      toast.success("Successfully logged in")
      navigate("/dashboard")
    }
    else toast.error("Invalid credentials")
  }

  return <div className="d-flex justify-content-center">
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" value={doctor.email || ""} onChange={onInputChange} />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" value={doctor.password || ""} onChange={onInputChange} />
      </Form.Group>
      <div className="d-flex justify-content-center" style={{ width: "100%" }}>
        <Button onClick={onLoginClick}>Login</Button>
      </div>
    </Form>
  </div>
}