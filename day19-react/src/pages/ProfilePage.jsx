import { useEffect, useState } from "react";
import api from "../api/axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login first");
          return;
        }

        const payload = JSON.parse(atob(token.split(".")[1]));

        const userId = payload.id;

        const response = await api.get(`/api/users/${userId}`);

        setUser(response.data);
        setName(response.data.name);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Name cannot be empty");
      return;
    }

    try {
      setUpdating(true);
      setMessage("");
      setError("");

      const token = localStorage.getItem("token");

      const payload = JSON.parse(atob(token.split(".")[1]));

      const userId = payload.id;

      const response = await api.put(`/api/users/${userId}`, {
        name: name.trim(),
      });

      setUser(response.data);
      setName(response.data.name);

      setMessage("Name updated successfully");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update name");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <h2>Loading profile...</h2>;
  }

  if (error && !user) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="profile-page">
      <h1>My Profile</h1>

      <form onSubmit={handleUpdate}>
        <div>
          <label>Name</label>

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div>
          <label>Email</label>

          <input type="email" value={user.email} disabled />
        </div>

        <div>
          <label>Role</label>

          <input type="text" value={user.role} disabled />
        </div>

        <button type="submit" disabled={updating}>
          {updating ? "Updating..." : "Update Name"}
        </button>
      </form>

      {message && <p>{message}</p>}

      {error && <p>{error}</p>}
    </div>
  );
};

export default ProfilePage;
