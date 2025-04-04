import Navbar from "./components/Navbar"
import Home from "./pages/Home"

import NewCharacter from "./pages/NewCharacter"

import LoginPage from "./pages/Login"
import SignupPage from "./pages/Signup"
import EditCharacters from "./pages/EditCharacters"
import UserProfile from "./pages/UserProfile"
import CharacterDetails from "./pages/CharacterDetails"

import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import BackgroundImg from "./assets/images/background.jpg"
import { useAuth } from "./contexts/AuthContext"
import AdminControlPanel from "./pages/AdminControlPanel"

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth()
  return <>{!isLoggedIn ? <Navigate to="/login" /> : <Outlet />}</>
}

function App() {
  return (
    <>
      <Navbar />
      <div
        className="fixed blur-lg bg-cover bg-center h-screen w-screen -z-10 opacity-40 pointer-events-none"
        style={{ backgroundImage: `url(${BackgroundImg})` }}
      />
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="/newCharacter" element={<NewCharacter />} />
          <Route path="/edit">
            <Route path=":id" element={<EditCharacters />} />
          </Route>
          <Route path="/user" element={<UserProfile />} />
          <Route path="/admin" element={<AdminControlPanel />} />
          <Route path="/character">
            <Route path=":id" element={<CharacterDetails />} />
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  )
}

export default App
