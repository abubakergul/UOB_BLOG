import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../components";
import "../assets/css/Landing.css";
import main from "../assets/images/main.svg";
const Landing = () => {
  return (
    <main className="main-landing">
      <div className="landing-page">
        <div className="info">
          <h1 className="heading-uob">
            <Logo />
            UOB BLOGGING APP
          </h1>

          <p>
            Welcoming to the Blogging application. This application was design
            to show how create blogs, add comments to the blog and post image on
            cloudinary (cloud based platform). The Application was created to
            experience how the blogging application works and what feature are
            included in it.
          </p>
          {/* <Link to="/" className="btn btn-hero"> */}
          <Link to="/posts" className="btn btn-explore">
            Explore Blogs
          </Link>
          {/* </Link> */}
        </div>
        <img src={main} alt="Landing" className="img: main-img" />
      </div>
    </main>
  );
};

export default Landing;
