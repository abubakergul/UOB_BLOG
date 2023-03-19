import "../assets/css/Navbar.css";
import { Link } from "react-router-dom";
import { FaSearch, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { Logo, FormRow } from "./index";
import { useAppContext } from "../context/appContext";
const Navbar = () => {
  const { isLoading, user, logoutUser, search, handleChangeInput } =
    useAppContext();
  const handleSearch = (e) => {
    if (isLoading) return;
    handleChangeInput({ name: e.target.name, value: e.target.value });
  };
  return (
    <nav>
      <Logo />
      <div className="search">
        <FaSearch className="fa-user-search" />
        <FormRow
          type="text"
          name="search"
          value={search}
          handleChange={handleSearch}
        />
      </div>
      <div className="btn-container">
        <Link to="/createPost" className="btn">
          Create Post
        </Link>
        <div className="btn-account">
          <button type="button" className="btn">
            <FaUserCircle className="fa-user-circle" />
            {user?.name}
            <FaCaretDown />
          </button>
          {!user && (
            <div className="dropdown">
              <Link to="/register">Login/Register</Link>
            </div>
          )}

          {user && (
            <div className="dropdown">
              <button type="btn" className="btn" onClick={logoutUser}>
                logout
              </button>
            </div>
          )}
        </div>
        {user && (
          <Link className="btn" to="/myPosts">
            My posts
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
