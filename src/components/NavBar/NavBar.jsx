import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service'

export default function NavBar({ user, setUser, isNavOpen, setIsNavOpen }) {

    // Toggle the navigation menu state
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }

    return (
        <nav className="bg-gray-900 w-full md:w-56 lg:w-56 text-white md:min-h-screen lg:min-h-screen sticky top-0">
          {/* Desktop Navbar */}
          <div className="hidden md:flex md:flex-col lg:flex lg:flex-col justify-between items-center p-4 sticky top-0">
            <div className='mb-4'>
              <Link
                to="/"
                className="text-2xl font-bold block mb-2 hover:text-blue-500 transition duration-300 ease-in-out"
              >
                Home
              </Link>
            </div>
            {user && (
              <div className="mb-4">
                <p className="text-lg">Welcome, {user.name}</p>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      to="/weather"
                      className="block text-lg hover:text-blue-500 transition duration-300 ease-in-out"
                    >
                      Weather
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/search"
                      className="block text-lg hover:text-blue-500 transition duration-300 ease-in-out"
                    >
                      Search
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/saved"
                      className="block text-lg hover:text-blue-500 transition duration-300 ease-in-out"
                    >
                      Saved
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="block text-lg hover:text-blue-500 transition duration-300 ease-in-out"
                    >
                      Settings
                    </Link>
                  </li>
                </ul>
              </div>
            )}
            {user ? (
              <Link
                to=""
                onClick={handleLogOut}
                className="text-lg hover:text-red-500 transition duration-300 ease-in-out"
              >
                Log Out
              </Link>
            ) : (
              <div className="mt-auto">
                <Link
                  to="/auth"
                  className="text-lg bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full block text-center"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
      
          {/* Mobile Navbar with Hamburger Dropdown */}
          <div className="block md:hidden lg:hidden p-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold hover:text-blue-500 transition duration-300 ease-in-out">
                Home
              </Link>
              <button
                onClick={toggleNav}
                className="text-2xl focus:outline-none"
              >
                &#8801;
              </button>
            </div>

                <div className={`mt-4 transition-all duration-300 ease-in-out ${isNavOpen ? 'block' : 'hidden'}`}>
              <ul>
                {user && (
                  <li>
                    <Link to="/weather" className="text-lg hover:text-blue-500 transition duration-300 ease-in-out">
                      Weather
                    </Link>
                  </li>
                )}
                {user && (
                  <li>
                    <Link to="/search" className="text-lg hover:text-blue-500 transition duration-300 ease-in-out">
                      Search
                    </Link>
                  </li>
                )}
                {user && (
                  <li>
                    <Link to="/saved" className="text-lg hover:text-blue-500 transition duration-300 ease-in-out">
                      Saved
                    </Link>
                  </li>
                )}
                {user && (
                  <li>
                    <Link to="/settings" className="text-lg hover:text-blue-500 transition duration-300 ease-in-out">
                      Settings
                    </Link>
                  </li>
                )}
                {user ? (
                  <li>
                    <Link
                      to=""
                      onClick={handleLogOut}
                      className="text-lg hover:text-red-500 transition duration-300 ease-in-out"
                    >
                      Log Out
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link
                      to="/auth"
                      className="text-lg hover:bg-blue-500 hover:text-white py-2 px-4 rounded-full block text-center transition duration-300 ease-in-out"
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      );
      
      
}