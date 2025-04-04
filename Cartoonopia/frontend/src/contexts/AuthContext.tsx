import React, { createContext, useState, useContext, useEffect } from "react"

interface AuthContextProps {
  isLoggedIn: boolean
  getToken: () => string | null
  setToken: (token: string) => void
  logout: () => void
  isAdmin: () => boolean
  setAdmin: (isAdmin: boolean) => void
}

export const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  getToken: () => "",
  setToken: () => {},
  logout: () => {},
  isAdmin: () => false,
  setAdmin: () => {},
})

const isLoggedInFunc = () => {
  return "token" in sessionStorage && sessionStorage.getItem("token") !== ""
}

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement
}) => {
  const [refresh, setRefresh] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInFunc())

  useEffect(() => {
    const timeout = setTimeout(() => {
      sessionStorage.setItem("token", "")
      sessionStorage.setItem("isAdmin", "false")
      setIsLoggedIn(false)
      console.log("Token expired")
    }, 30 * 60 * 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [refresh])

  const getToken = () => {
    return sessionStorage.getItem("token")
  }

  const setToken = (token: string) => {
    sessionStorage.setItem("token", token)
    setIsLoggedIn(isLoggedInFunc())
    setRefresh(!refresh)
  }

  const logout = () => {
    sessionStorage.setItem("token", "")
    sessionStorage.setItem("isAdmin", "false")
    setIsLoggedIn(false)
    setRefresh(!refresh)
  }

  const isAdmin = () => sessionStorage.getItem("isAdmin") === "true"

  const setAdmin = (isAdmin: boolean) => {
    sessionStorage.setItem("isAdmin", isAdmin ? "true" : "false")
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        getToken: getToken,
        logout: logout,
        setToken: setToken,
        isAdmin: isAdmin,
        setAdmin: setAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within a AuthContext")
  }
  return context
}

export function generateHeader() {
  const token = sessionStorage.getItem("token")
  return `Bearer ${token}`
}
