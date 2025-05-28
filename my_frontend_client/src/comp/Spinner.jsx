import { Spinner } from "react-bootstrap"

export default function () {
  return <div className="d-flex justify-content-center align-items-center mt-3 mb-3" style={{ width: "100%" }}>
    <Spinner animation="grow" />
    <span style={{ marginLeft: "10px" }}>Loading...</span>
  </div>
}