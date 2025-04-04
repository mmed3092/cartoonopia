import { useMutation } from "@tanstack/react-query"
import { login, signup } from "../api/LoginQuery"

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async ({
      username,
      password,
    }: {
      username: string
      password: string
    }) => {
      const data = await login(username, password)
      return data
    },
  })
}

export const useSignupMutation = () => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async ({
      firstname,
      lastname,
      email,
      password,
    }: {
      firstname: string
      lastname: string
      email: string
      password: string
    }) => {
      const data = await signup(firstname, lastname, email, password)
      return data
    },
  })
}
