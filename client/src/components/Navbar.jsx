import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../App";
import Logout from "../functions/Logout";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);

  return (
    <nav>
      <ul className="flex gap-4 justify-center items-center p-3">
        <li>
          <NavLink
            to="/"
            className="bg-gray-200 p-1 px-3 rounded-md hover:bg-gray-300 cursor-pointer"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className="bg-gray-200 p-1 px-3 rounded-md hover:bg-gray-300 cursor-pointer"
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className="bg-gray-200 p-1 px-3 rounded-md hover:bg-gray-300 cursor-pointer"
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/register"
            className="bg-gray-200 p-1 px-3 rounded-md hover:bg-gray-300 cursor-pointer"
          >
            Register
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className="bg-gray-200 p-1 px-3 rounded-md hover:bg-gray-300 cursor-pointer"
          >
            Contact
          </NavLink>
        </li>
        
        <li onClick={Logout} hidden={state ? "" : "hidden"}>
          <NavLink
            // to="/logout"
            className="bg-gray-200 p-1 px-3 rounded-md hover:bg-gray-300 cursor-pointer"
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
