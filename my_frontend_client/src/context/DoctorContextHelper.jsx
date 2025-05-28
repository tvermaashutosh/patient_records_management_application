import DoctorContext from "./DoctorContext"

export default function (props) {
  const burl = import.meta.env.VITE_BACKENDURL

  async function loginDoctor(email, password) {

    const res = await fetch(`${burl}/doctor/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()
    if (data.token) {
      localStorage.setItem("my_jwt_token", data.token)
      return true
    }
    return false
  }

  return <DoctorContext.Provider value={{ loginDoctor }}>
    {props.children}
  </DoctorContext.Provider>
}