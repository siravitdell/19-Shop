import React from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { BsBagCheck } from "react-icons/bs";
import { useSelector } from "react-redux";
import hlogo from "../19logo.png"
export default function Header() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const { user } = JSON.parse(localStorage.getItem("currentUser"));
  const logout = () => {
    localStorage.removeItem("currentUser");
    window.location.reload();
  };
  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={hlogo} alt="" className="hlogo"/> <span >Shop</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <FaBars size={25} color="white" />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/orders"
                >
                  <BsBagCheck size={24} /> Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  <FiShoppingCart size={24} /> {cartItems.length}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <AiOutlineUser size={24} />
                  {user.email.substring(0, user.email.length - 10)}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={logout}>
                  <MdLogout size={24} />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
