import { axios } from "./QueryClient"
import { Character } from "../types/CartoonopiaTypes"

export async function getAllCharacters() {
  return axios
    .get("/character")
    .then((response) => response.data as Character[])
    .catch((error) => {
      throw new Error(String(error.response.data.error))
    })
}

export async function getSingleCharacter(id: string) {
  return axios
    .get(`/character/${id}`)
    .then((response) => response.data as Character)
    .catch((error) => {
      throw new Error(String(error.response.data.error))
    })
}
