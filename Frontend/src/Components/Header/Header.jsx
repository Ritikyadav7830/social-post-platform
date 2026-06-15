import React, { useState, useEffect } from "react";
import Container from "../Container/Container";
import LogoutBtn from "./LogoutBtn.jsx";
import SearchBtn from "./SearchBtn.jsx";
import Logo from "../Logo";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector(
    (state) => state.auth.status
  );

  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
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

        <nav className="flex items-center justify-between py-3">

          {/* Logo + Search */}
          <div className="flex items-center gap-3">
            <Link to="/">
              <Logo width="70px" />
            </Link>

            {authStatus && (
              <div className="hidden md:block">
                <SearchBtn />
              </div>
            )}
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`px-5 py-2 rounded-full transition-all duration-200 cursor-pointer
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

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </nav>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <div className="fixed top-16 left-0 w-full h-[calc(100vh-64px)] bg-white z-40 md:hidden overflow-y-auto">

            <div className="p-4">

              {authStatus && (
                <div className="mb-4">
                 <SearchBtn
                   onSearch={() => setMenuOpen(false)}
                 />
                </div>
              )}

              <ul className="flex flex-col gap-3">

                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          navigate(item.slug);
                          setMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition
                        ${
                          location.pathname === item.slug
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item.name}
                      </button>
                    </li>
                  ) : null
                )}

                {authStatus && (
                  <li
                    onClick={() => setMenuOpen(false)}
                  >
                    <LogoutBtn />
                  </li>
                )}

              </ul>

            </div>

          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;