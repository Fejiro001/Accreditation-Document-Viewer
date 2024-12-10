import { useEffect, useState } from "react";
import api from "../api";

/**
 * Custom hook to manage and fetch user information.
 *
 * This hook provides a mechanism to fetch user data from the API
 * and manage the loading state. The `fetchUsers` function is used to
 * retrieve user data from the server and update the state accordingly.
 *
 * @returns {Object}
 */
export const useUsersInfo = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({
    current_page: 1,
    last_page: 1,
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/users?page=${page}`);
        setUsers(response.data.data);
        setMeta({
          current_page: response.data.current_page,
          last_page: response.data.last_page,
        });
      } catch (error) {
        console.error("Error fetching users: ", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  return { users, loading, meta, setPage };
};
