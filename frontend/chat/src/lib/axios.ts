import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000/user/v1", // fallback
  withCredentials: true, // optional: sends cookies
})

export default api
