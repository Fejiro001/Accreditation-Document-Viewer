import { useEffect, useState } from "react";
import api from "../api";

/**
 * Custom hook to manage and fetch user information.
 *
 * This hook provides a mechanism to fetch user data from the API
 * and manage the loading state. The `fetchUsers` function is used to
 * retrieve user data from the server and update the state accordingly.
 *
 * @returns {Object} An object containing:
 * - `users`: An array of user objects.
 * - `loading`: A boolean indicating if the data is currently being fetched.
 * - `fetchUsers`: A function to manually trigger the fetching of user data.
 */
export const useUsersInfo = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/users");
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching users: ", error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, fetchUsers };
};
