import { generateHeader } from "../contexts/AuthContext"
import { Change, User } from "../types/CartoonopiaTypes"
import { axios } from "./QueryClient"

export function getSingleUser(id: string) {
  return axios
    .get(`/admin/user/${id}`)
    .then((response) => response.data as User)
    .catch((error) => {
      throw new Error(String(error.response.data.error))
    })
}

export function approveContribution(id: string) {
  return axios
    .post(`/admin/approve/${id}`, {})
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(String(error.response.data.error))
    })
}

export function rejectContribution(id: string) {
  return axios
    .post(
      `/admin/reject/${id}`,
      {},
      {
        headers: { Authorization: generateHeader() },
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(String(error.response.data.error))
    })
}

export function getChanges() {
  return axios
    .get(`/admin/changes`, {
      headers: { Authorization: generateHeader() },
    })
    .then((response) => response.data as Change[])
    .catch((error) => {
      throw new Error(String(error.response.data.error))
    })
}

export function getUsers() {
  return axios
    .get(`/admin/users`, {
      headers: { Authorization: generateHeader() },
    })
    .then((response) => response.data as User[])
    .catch((error) => {
      throw new Error(String(error.response.data.error))
    })
}

export function getAdmins() {
  return axios
    .get(`/admin/admins`, {
      headers: { Authorization: generateHeader() },
    })
    .then((response) => response.data as User[])
    .catch((error) => {
      throw new Error(String(error.response.data.error))
    })
}

export function demoteAdmin(id: string) {
  return axios
    .post(`/admin/demote/${id}`, {})
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(String(error.response.data.error))
    })
}

export function promoteUser(id: string) {
  return axios
    .post(`/admin/promote/${id}`, {})
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(String(error.response.data.error))
    })
}
