import { useContext, useEffect } from "react"

import PatientContext from "../context/PatientContext"

import Header from "../comp/Header"
import Table from "../comp/Table"

export default function () {
  const context = useContext(PatientContext)
  useEffect(function () {
    (async function () {
      await context.getPatient()
    })()
  }, [])

  return <>
    <Header />
    <Table />
  </>
}