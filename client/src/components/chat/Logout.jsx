import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import axios from "axios";
import { logoutRoute } from "../../utils/ApiRoutes";
import "../../assets/scss/logout.scss"

export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };
  return (
    <li onClick={handleClick} class="hover:bg-gray-300 text-gray-700 block px-4 py-2 text-sm cursor-pointer" id="cmenu-item-4">Logout</li>
  );
};