import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

function Navbar() {
  const { isLoggedIn, isAdmin, logout } = useAuth()
  return (
    <div className="bg-black">
      <div className="text-white flex text-center">
        <div className="flex-grow">
          <div className="text-8xl">Cartoonopia</div>
          <div>The home of characters and cartoons!</div>
          {isLoggedIn && (
            <Link to="/">
              <button className="bg-white text-black p-2">Home</button>
            </Link>
          )}
        </div>
        <div className="p-4 flex flex-col gap-2">
          {isAdmin() && (
            <Link to="/admin">
              <button className="bg-white text-black p-2">Admin Panel</button>
            </Link>
          )}
          {isLoggedIn && (
            <>
              <Link to="/user">
                <button className="bg-white text-black p-2">
                  User Profile
                </button>
              </Link>
              <Link to="/login">
                <button
                  className="bg-white text-black p-2"
                  onClick={() => logout()}
                >
                  Logout
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
