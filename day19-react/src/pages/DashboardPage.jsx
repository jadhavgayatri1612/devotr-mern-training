import { useEffect, useState } from "react";
import api from "../api/axios";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.id;

        const response = await api.get(`/api/users/${userId}`);

        setUser(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch user:",
          error.response?.data || error.message,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!user) {
    return <h2>User data not found</h2>;
  }

  return (
    <div className="dashboard-page">
      <h1>Welcome, {user.name} 👋</h1>

      <p>
        <strong>Role:</strong> {user.role}
      </p>
    </div>
  );
};

export default DashboardPage;
