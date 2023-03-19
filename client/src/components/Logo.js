import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Logo = () => {
  return (
    <Link to="/posts">
      {" "}
      <img src={logo} alt="UOB BLOGS" className="logo" />
    </Link>
  );
};

export default Logo;
