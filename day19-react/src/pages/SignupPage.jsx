import { useState } from "react";
import { useNavigate} from "react-router-dom";
import api from "../api/axios";
function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate =useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

try {
  const response = await api.post("/api/auth/signup", {
    name,
    email,
    password,
  });

  alert(response.data.message || "Signup successful");

  navigate("/login");
} catch (err) {
  setError(err.response?.data?.message || "Signup failed");
} finally {
  setLoading(false);
}
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <br /><br />

        {error && <p>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>
        <p style={{ marginTop: "20px", color: "white" }}>
  Already have an account?{" "}
  <a href="/login" style={{ color: "#ffd700" }}>
    Login
  </a>
</p>
      </form>
    </div>
  );
}

export default SignupPage;