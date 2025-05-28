import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import DatePicker from "react-datepicker"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faXmark, faPlus } from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"

import PatientContext from "../context/PatientContext"

import Helper from "../helper"

export default function () {
  const context = useContext(PatientContext)

  const [currDate, setCurrDate] = useState(new Date())
  const [nameF, setNameF] = useState(context.nameF)
  const [registrationDateF, setRegistrationDateF] = useState(context.registrationDateF)
  const [nameFFocused, setNameFFocused] = useState(false)

  function onNameChange(e) {
    setNameF(e.target.value.toUpperCase())
    context.setNameF(e.target.value.toUpperCase())
  }
  function onDateChange(e) {
    setRegistrationDateF(e.toLocaleString().slice(0, 15))
    context.setRegistrationDateF(e.toLocaleString().slice(0, 15))
  }
  async function onSearchClick() {
    await context.getPatient(null, nameF, registrationDateF)
  }
  async function onClearClick() {
    setNameF("")
    setRegistrationDateF("")
    context.setNameF("")
    context.setRegistrationDateF("")

    await context.getPatient(null, "", "")
  }
  const navigate = useNavigate()
  function onAddPatientClick() {
    if (!localStorage.getItem("my_jwt_token"))
      toast.warn("You cannot add any patient since you are not logged in")

    navigate("/add_patient")
  }
  function onNameFocus() {
    setNameFFocused(true)
  }
  function onNameBlur() {
    setNameFFocused(false)
  }

  useEffect(function () {
    setInterval(function () {
      setCurrDate(new Date())
    }, 1000)
  }, [])

  return <div className="c">
    <div className="c1">
      <div className="c11" style={{ fontFamily: "'Roboto Mono', monospace", color: "rgb(54, 69, 79)" }}>
        {Helper.formatDateSecond(currDate)}
      </div>

      <div className="c12 d-flex">
        <Form.Control className="c121" style={{ height: "30px", border: nameFFocused ? "2px solid" : "1px solid rgb(128, 128, 128)", borderRadius: "2px", boxShadow: "none", outline: "none", paddingLeft: "2px", marginLeft: nameFFocused ? "0" : "1px", marginRight: nameFFocused ? "8px" : "9px" }} type="text" placeholder="Search by name" onFocus={onNameFocus} onBlur={onNameBlur} value={nameF} onChange={onNameChange} />

        <DatePicker className="c122"
          dateFormat="dd MMM yyyy"
          placeholderText="Search by date"
          selected={registrationDateF}
          onChange={onDateChange}
        />

        <div className="d-flex c123">
          <Button className="c1231" style={{ display: "block" }} onClick={onSearchClick}>
            <span className="d-flex align-items-center">
              <FontAwesomeIcon icon={faMagnifyingGlass} /><span style={{ marginLeft: "5px" }}>Search</span>
            </span>
          </Button>
          <Button className="c1232" style={{ display: "block", marginLeft: "8px" }} onClick={onClearClick}>
            <span className="d-flex align-items-center">
              <FontAwesomeIcon icon={faXmark} /><span style={{ marginLeft: "5px" }}>Clear</span>
            </span>
          </Button>
        </div>
      </div>
    </div>

    <div className="c2 d-flex flex-column">
      <div className="c21">
        Total patient entries<span style={{ fontFamily: "'Roboto Mono', monospace", color: "rgb(54, 69, 79)", marginLeft: "10px" }}>{context.totalCount}</span>
      </div>
      <Button className="c22" onClick={onAddPatientClick} style={{ display: "block" }}>
        <span className="d-flex align-items-center">
          <FontAwesomeIcon icon={faPlus} /><span style={{ marginLeft: "5px" }}>Add patient</span>
        </span>
      </Button>
    </div>
  </div>
}