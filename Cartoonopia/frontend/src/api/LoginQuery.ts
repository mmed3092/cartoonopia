import { axios } from "./QueryClient"
import bcrypt from "bcryptjs"

export async function login(username: string, password: string) {
  const response = await axios.post("/auth/login", {
    username: username,
    password: password,
  })
  return response.data
}

export async function signup(
  firstname: string,
  lastname: string,
  email: string,
  password: string
) {
  const salt = bcrypt.genSaltSync(10)
  const hashed_password = await bcrypt.hash(password, salt)
  return axios
    .post("/auth/signup", {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashed_password,
    })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data.error)
    })
}
