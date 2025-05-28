import { useNavigate } from "react-router-dom"
import { Navbar, Nav, Container, Button } from "react-bootstrap"
import { toast } from "react-toastify"

export default function () {

  const navigate = useNavigate()
  function onLogoClick() {
    navigate("/")
  }
  function onHomeClick() {
    navigate("/home")
  }
  function onDashboardClick() {
    if (!localStorage.getItem("my_jwt_token"))
      toast.warn("You cannot add / edit / delete any patient since you are not logged in")

    navigate("/dashboard")
  }
  function onLoginClick() {
    navigate("/login")
  }
  function onLogoutClick() {
    localStorage.removeItem("my_jwt_token")
    toast.warn("You have been logged out")
    navigate("/login")
  }

  return <Navbar collapseOnSelect expand="lg" style={{ boxShadow: "0 0.01rem 1rem rgba(0, 0, 0, 0.3)" }}>
    <Container>
      <Navbar.Brand onClick={onLogoClick} style={{ cursor: "pointer" }}>
        <span className="d-flex align-items-center">
          <img src="logo.ico" style={{ height: "35px", marginRight: "10px" }} /><span style={{ marginTop: "2px" }}>Smile Care Dental Clinic</span>
        </span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link onClick={onHomeClick}>Home</Nav.Link>
          <Nav.Link onClick={onDashboardClick}>Dashboard</Nav.Link>
        </Nav>

        <Nav>
          {!localStorage.getItem("my_jwt_token") ?
            <Nav.Link><Button variant="primary" onClick={onLoginClick}>Login</Button></Nav.Link> :
            <Nav.Link><Button variant="primary" onClick={onLogoutClick}>Logout</Button></Nav.Link>}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
}