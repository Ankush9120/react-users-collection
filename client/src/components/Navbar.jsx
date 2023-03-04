import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../App";

import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate()

  const DoLogout = async () => {
    try {
      const request = await fetch("http://localhost:5000/logout", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(request);

      const res = await request.json();
      console.log(res);

      dispatch({ type: "USER", payload: false });
      toast.success(res.message);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };


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

        <li hidden={state ? "" : "hidden"}>
          <NavLink
            onClick={DoLogout}
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
