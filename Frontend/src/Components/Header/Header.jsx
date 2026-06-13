import React from 'react'
import Container from '../Container/Container'
import LogoutBtn from "./LogoutBtn.jsx"
import SearchBtn from "./SearchBtn.jsx"
import Logo from '../Logo'
import {
  Link,
  useNavigate,
  useLocation
} from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {

  const authStatus = useSelector(
    (state) => state.auth.status
  );

  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <Container>

        <nav className="flex items-center justify-between h-16">

          {/* Left Side */}
          <div className="flex items-center gap-5">

            <Link to="/">
              <Logo width="70px" />
            </Link>

            {authStatus && (
              <SearchBtn />
            )}

          </div>

          {/* Right Side */}
          <ul className="flex items-center gap-2">

            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() =>
                      navigate(item.slug)
                    }
                    className={`px-6 py-2 rounded-full transition-all duration-200 cursor-pointer
                    ${
                      location.pathname === item.slug
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-indigo-600 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}

          </ul>

        </nav>

      </Container>
    </header>
  );
}

export default Header;