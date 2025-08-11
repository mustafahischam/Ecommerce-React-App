
import { Navbar as HeroUiNavbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CounterContext } from "../Context/CounterContext";
import { AuthContext } from "../Context/AuthContext";

export default function Navbar() {

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();


  function logout() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');

  }
  // let{counter} = useContext(CounterContext);

  return (
    <HeroUiNavbar>
      <NavbarBrand>

        <p className="font-bold text-inherit">Linked-Posts</p>
      </NavbarBrand>

      <NavbarContent justify="end">
        {isLoggedIn ? (
          <>
            <NavbarItem>
              <NavLink to="/profile">Profile</NavLink>
            </NavbarItem>
            <NavbarItem onClick={logout} className="cursor-pointer">
              LogOut
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <NavLink to="/register">Register</NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink to="/login">sign in</NavLink>
            </NavbarItem>
          </>
        )}



      </NavbarContent>
    </HeroUiNavbar>
  )
}