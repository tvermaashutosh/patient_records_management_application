import { useContext, useEffect, useState } from "react"
import { Card, Table, Pagination, Form } from "react-bootstrap"

import PatientContext from "../context/PatientContext"

import Helper from "../helper"

import Modal from "./Modal"
import Spinner from "./Spinner"

export default function () {

  const [selectedPatient, setSelectedPatient] = useState(null)
  const [currDate, setCurrDate] = useState(new Date())

  const context = useContext(PatientContext)
  function getPaginationItems() {
    const a = []
    a.push(<Pagination.Item key={context.currentPage} active>{context.currentPage}</Pagination.Item>)

    if (context.currentPage >= 2) a.unshift(<Pagination.Prev key={context.currentPage - 1} onClick={() => onPageNumberClick(context.currentPage - 1)} />)
    if (context.currentPage <= context.totalPages - 1) a.push(<Pagination.Next key={context.currentPage + 1} onClick={() => onPageNumberClick(context.currentPage + 1)} />)

    if (context.currentPage >= 2) a.unshift(<Pagination.Item key={0} onClick={() => onPageNumberClick(1)}>1</Pagination.Item>)
    if (context.currentPage <= context.totalPages - 1) a.push(<Pagination.Item key={context.totalPages + 1} onClick={() => onPageNumberClick(context.totalPages)}>{context.totalPages}</Pagination.Item>)
    return a
  }
  function onRowClick(patient) {
    setSelectedPatient(patient)
  }
  async function onPageNumberClick(page) {
    await context.getPatient(page)
  }

  useEffect(function () {
    setInterval(function () {
      setCurrDate(new Date())
    }, 1000)
  }, [])

  return <>
    <Card className="mt-5" style={{ overflow: "hidden", boxShadow: "0 0.1rem 1.5rem rgba(0, 0, 0, 0.4)" }}>
      <Table responsive style={{ marginBottom: "0" }}>
        <thead className="table-responsive-thead">
          <tr>
            <th style={{ backgroundColor: "rgb(129, 133, 137)", color: "rgb(255,255,255)" }}>Patient name</th>
            <th style={{ backgroundColor: "rgb(129, 133, 137)", color: "rgb(255,255,255)" }}>Sex</th>
            <th style={{ backgroundColor: "rgb(129, 133, 137)", color: "rgb(255,255,255)" }}>Age</th>
            <th style={{ backgroundColor: "rgb(129, 133, 137)", color: "rgb(255,255,255)" }}>Address</th>
            <th style={{ backgroundColor: "rgb(129, 133, 137)", color: "rgb(255,255,255)" }}>Next appointment</th>
          </tr>
        </thead>
        <tbody>
          {context.patientArray.map(function (p) {
            const todayString = currDate.toDateString()
            const regString = new Date(p.registrationDate).toDateString()
            const isToday = regString === todayString

            return <tr onClick={() => onRowClick(p)} style={{ cursor: "pointer", borderBottom: isToday ? "1px solid white" : undefined }} key={p._id}>
              <td style={{ backgroundColor: isToday ? "rgb(229, 228, 226)" : undefined }}>{Helper.substring18(p.name)}</td>
              <td style={{ backgroundColor: isToday ? "rgb(229, 228, 226)" : undefined }}>{p.sex}</td>
              <td style={{ backgroundColor: isToday ? "rgb(229, 228, 226)" : undefined }}>{p.age}</td>
              <td style={{ backgroundColor: isToday ? "rgb(229, 228, 226)" : undefined }}>{Helper.substring18(p.address)}</td>
              <td style={{ fontFamily: "'Roboto Mono', monospace", color: "rgb(113, 121, 126)", fontWeight: "100", backgroundColor: isToday ? "rgb(229, 228, 226)" : undefined }}>{Helper.formatDate(p.nextAppointment)}</td>
            </tr>
          })}
        </tbody>
      </Table>

      {!context.patientArray.length && <Spinner />}
    </Card>

    <div className="d-flex justify-content-center mt-4" style={{ width: "100%" }}>
      <Pagination>{getPaginationItems()}</Pagination>
    </div>

    {selectedPatient && <Modal selectedPatient={selectedPatient} setSelectedPatient={setSelectedPatient} />}
  </>
}