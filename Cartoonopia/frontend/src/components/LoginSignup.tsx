import { Link, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useLoginMutation, useSignupMutation } from "../hooks/UserHooks"
import { useAuth } from "../contexts/AuthContext"
import LoadingIMG from "./LoadingIMG"

function BoxWrapper({ children }: { children: React.ReactElement }) {
  return (
    <div className="display-flex items-center justify-center h-screen ">
      <div className="p-6 bg-gray-100 space-y-5 rounded-lg shadow-md border-bold mx-auto w-fit">
        {children}
      </div>
    </div>
  )
}

function Header({ heading }: { heading: string }) {
  return (
    <div className="mb-10">
      <div className="flex justify-center">
        <h2 className="text-3xl text-center font-bold text-black p-10">
          {heading}
        </h2>
      </div>
    </div>
  )
}

function LoginBox() {
  const { mutate, isError, isPending, isSuccess, data } = useLoginMutation()
  const { setToken, setAdmin } = useAuth()
  const navigate = useNavigate()
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value })
    e.preventDefault()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    mutate(loginDetails)
    e.preventDefault()
  }

  useEffect(() => {
    if (isSuccess) {
      const { token, isAdmin } = data
      setToken(token)
      setAdmin(isAdmin)
      navigate("/")
    }
  }, [isSuccess])

  return (
    <BoxWrapper>
      <form className="space-y-5 md:space-y-5" onSubmit={handleSubmit}>
        <div>
          <input
            name="username"
            className="bg-blue-50 border-gray-400 text-black rounded-lg block w-full pl-2"
            placeholder="Username"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="password"
            className="bg-blue-50 border-gray-400 text-black rounded-lg block w-full pl-2"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-700 hover:bg-gray-500 rounded-md"
        >
          Sign in
        </button>
        {isError && (
          <div className="text-red-400">Incorrect username or password</div>
        )}
        {isPending && <LoadingIMG className="w-1 h-1" />}
        <p className="text-sm text-gray-400">
          New to Cartoonopia?
          <Link to="/signup" className="pl-3 font-bold text-blue-500">
            Sign up
          </Link>
        </p>
      </form>
    </BoxWrapper>
  )
}

function SignupBox() {
  const { mutate, isError, isPending, isSuccess, error } = useSignupMutation()
  const [formState, setFormState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    mutate(formState)
    e.preventDefault()
  }

  return (
    <BoxWrapper>
      <form onSubmit={handleSubmit} className="space-y-5 md:space-y-5">
        <input
          name="firstname"
          className="bg-blue-50 border-gray-400 text-black rounded-lg block w-full pl-2"
          placeholder="First Name"
          onChange={handleChange}
        />
        <input
          name="lastname"
          className="bg-blue-50 border-gray-400 text-black rounded-lg block w-full pl-2"
          placeholder="Last Name"
          onChange={handleChange}
        />
        <input
          name="email"
          className="bg-blue-50 border-gray-400 text-black rounded-lg block w-full pl-2"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          name="password"
          className="bg-blue-50 border-gray-400 text-black rounded-lg block w-full pl-2"
          placeholder="Password"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-700 hover:bg-gray-500 rounded-md"
        >
          Sign in
        </button>
        {isError && <div className="text-red-400">{error.message}</div>}
        {isPending && <LoadingIMG className="w-1 h-1" />}
        <p className="text-sm text-gray-400">
          Already a member at Cartoonopia?
          <Link to="/login" className="pl-3 font-bold text-blue-500">
            Log in
          </Link>
        </p>
      </form>
    </BoxWrapper>
  )
}

export { Header, LoginBox, SignupBox, BoxWrapper }
