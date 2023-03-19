import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css/Register.css";
import { Logo, FormRow, Alert } from "../components";
import { useAppContext } from "../context/appContext";
const Register = () => {
  const defaultState = {
    isMember: true,
    name: "",
    email: "",
    password: "",
  };
  const [values, setValues] = useState(defaultState);
  const { isLoading, showAlert, displayAlert, registerUser, loginUser, user } =
    useAppContext();
  const navigate = useNavigate();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!name && !isMember)) {
      displayAlert();
      return;
    }
    const currentMember = { name, email, password };
    if (isMember) {
      loginUser(currentMember);
    } else {
      registerUser(currentMember);
    }
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/posts");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <section className="register">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            name="name"
            value={values.name}
            handleChange={handleChange}
            type="type"
            className="form-input"
          />
        )}
        <FormRow
          name="email"
          value={values.email}
          handleChange={handleChange}
          type="email"
          className="form-input"
        />
        <FormRow
          name="password"
          value={values.password}
          handleChange={handleChange}
          type="password"
          className="form-input"
        />
        <button className="btn btn-block" type="submit" disabled={isLoading}>
          Submit
        </button>
        <p>
          {values.isMember ? "Not a member yet" : "Already a member"}
          <button className="member-btn" type="button" onClick={toggleMember}>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
        <Link to="/">Back to Home</Link>
      </form>
    </section>
  );
};

export default Register;
