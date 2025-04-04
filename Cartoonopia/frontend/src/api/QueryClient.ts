import { QueryClient } from "@tanstack/react-query"
import axios from "axios"
import { generateHeader } from "../contexts/AuthContext"

const queryClient = new QueryClient()

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
})

axiosInstance.interceptors.request.use((config) => {
  config.headers["Authorization"] = generateHeader()
  return config
})

export { queryClient, axiosInstance as axios }
