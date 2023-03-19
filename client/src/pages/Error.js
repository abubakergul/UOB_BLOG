import { Link } from "react-router-dom";
import img from "../assets/images/not-found.svg";
import "../assets/css/ErrorPage.css";

const Error = () => {
  return (
    <main className="error-page">
      <div>
        <img src={img} alt="bot found" />
        <h3>Oh page not found</h3>
        <p>We cannot find the page at the movement</p>
        <Link className="btn" to="/">
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default Error;
