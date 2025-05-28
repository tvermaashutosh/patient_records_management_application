function pad(n) {
  return n.toString().padStart(2, "0")
}

function formatDate(dd) {
  if (!dd) return ""
  const d = new Date(dd),
    day = d.getDate(),
    mon = d.toLocaleString("default", { month: "short" }),
    yea = d.getFullYear(),
    hou = d.getHours(),
    min = d.getMinutes()

  const apm = hou < 12 ? "AM" : "PM",
    hou1 = (hou % 12) || 12

  return `${pad(day)} ${mon} ${yea} — ${pad(hou1)} : ${pad(min)} ${apm}`
}

function formatDateSecond(dd) {
  if (!dd) return ""
  const d = new Date(dd),
    day = d.getDate(),
    mon = d.toLocaleString("default", { month: "short" }),
    yea = d.getFullYear(),
    wee = d.toLocaleString("default", { weekday: "short" }),
    hou = d.getHours(),
    min = d.getMinutes(),
    sec = d.getSeconds()

  const apm = hou < 12 ? "AM" : "PM",
    hou1 = (hou % 12) || 12

  return `${pad(day)} ${mon} ${yea} — ${wee} — ${pad(hou1)} : ${pad(min)} : ${pad(sec)} ${apm}`
}

function formatDateTemp(dd) {
  if (!dd) return ""
  const pad = n => String(n).padStart(2, "0")
  const d = new Date(dd)
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) + "T" + pad(d.getHours()) + ":" + pad(d.getMinutes())
}

function substring18(s) {
  return s.length <= 18 ? s : s.slice(0, 15) + "..."
}

export default { formatDate, formatDateSecond, formatDateTemp, substring18 }