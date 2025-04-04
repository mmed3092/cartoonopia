import { axios } from "./QueryClient"
import { generateHeader } from "../contexts/AuthContext"

export const toggleFavourite = (id: string) => {
    return axios.post(`/favourites/${id}`, {}, {
        headers: {Authorization: generateHeader()}
    })
    .then(res => res.data as { isFavourite: boolean })
    .catch(err => {
        throw new Error(err.response.data.message)
    })
}

export const getAllFavourites = () => {
    return axios.get('/favourites', {
        headers: {Authorization: generateHeader()}
    })
    .then(res => res.data as string[])
    .catch(err => {
        throw new Error(err.response.data.message)
    })
}

export const getIsFavourites = (id: string) => {
    return axios.get(`/favourites/${id}`, {
        headers: {Authorization: generateHeader()}
    })
    .then(res => res.data as boolean)
    .catch(err => {
        throw new Error(err.response.data.message)
    })
}