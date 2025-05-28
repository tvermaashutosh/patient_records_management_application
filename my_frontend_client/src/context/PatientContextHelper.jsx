import { useState } from "react"

import PatientContext from "./PatientContext"

export default function (props) {
  const burl = import.meta.env.VITE_BACKENDURL

  const [nameF, setNameF] = useState("")
  const [registrationDateF, setRegistrationDateF] = useState("")
  const [patientArray, setPatientArray] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalCount, setTotalCount] = useState(0)

  async function getPatient(page, name, registrationDate) {

    const res = await fetch(`${burl}/patient/read?page=${page ?? 1}&page_size=20`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name ?? nameF,
        registrationDate: registrationDate ?? registrationDateF
      })
    })

    if (page) setCurrentPage(page)
    else setCurrentPage(1)

    const data = await res.json()
    setPatientArray(data.patientArray)
    setTotalPages(data.totalPages)
    setTotalCount(data.totalCount)
  }

  async function addPatient(patient) {

    await fetch(`${burl}/patient/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("my_jwt_token")}`
      },
      body: JSON.stringify(patient)
    })

    await getPatient()
  }

  async function editPatient(patient) {

    await fetch(`${burl}/patient/update/${patient._id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("my_jwt_token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(patient)
    })

    await getPatient()
  }

  async function deletePatient(patient) {

    await fetch(`${burl}/patient/delete/${patient._id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("my_jwt_token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(patient)
    })

    await getPatient()
  }

  return <PatientContext.Provider value={{ patientArray, nameF, registrationDateF, currentPage, totalPages, totalCount, setNameF, setRegistrationDateF, getPatient, addPatient, editPatient, deletePatient }}>
    {props.children}
  </PatientContext.Provider>
}