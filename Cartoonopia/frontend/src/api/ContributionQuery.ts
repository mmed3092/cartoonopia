import { axios } from "./QueryClient"
import { Character, Contribution } from "../types/CartoonopiaTypes"

export async function updateContribution(
  id: string,
  contribution: { [key: string]: string }
) {
  return axios
    .put(`/contributions/${id}`, contribution)
    .then((response) => {
      return response.data as Character
    })
    .catch((error) => {
      throw new Error(String(error.response.data.error))
    })
}

export async function deleteContribution(id: string) {
  return axios
    .delete(`/admin/character/${id}`)
    .then((response) => {
      return response.data as Character
    })
    .catch((error) => {
      throw new Error(String(error.response.data.error))
    })
}

export async function revokeContribution(id: string) {
  return axios
    .patch(`/contributions/${id}`)
    .then((response) => {
      console.log("character:")
      console.log(response.data);
      return response.data as Character
      
    })
    .catch((error) => {
      throw new Error(String(error.response.data.error))
    })
}

export async function addContribution(contribution: { [key: string]: string }) {
  return axios
    .post(`/contributions`, contribution)
    .then((response) => {
      return response.data as Character
    })
    .catch((error) => {
      throw new Error(String(error.response.data.error))
    })
}

export async function getUserContributions() {
  return axios
    .get(`/contributions`)
    .then((response) => {
      return response.data as Contribution[]
    })
    .catch((error) => {
      throw new Error(String(error.response.data.error))
    })
}

export async function getAdminContributions() {
  return axios
    .get(`admin/contributions`)
    .then((response) => {
      console.log(response.data)
      return response.data as Contribution[]
    })
    .catch((error) => {
      throw new Error(String(error.response.data.error))
    })
}
