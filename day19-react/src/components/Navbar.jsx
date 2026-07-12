import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Home</Link>

      {token ? (
        <>
          {" | "}
          <Link to="/products">Products</Link>
          {" | "}
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          {" | "}
          <Link to="/login">Login</Link>
          {" | "}
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;