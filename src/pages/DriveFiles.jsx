import axios from "axios";
import { useEffect, useState } from "react";

function DriveFiles() {
  const [folders, setFolders] = useState([]); // To store fetched folders
  const [loading, setLoading] = useState(true); // To show loading state
  const [error, setError] = useState(null); // To store error message if any

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.get("/api/getFolders");
        setFolders(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFolders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h2>Google Drive Folders</h2>
      <ul>
        {folders.map((folder) => (
          <li key={folder.id}>
            <strong>{folder.name}</strong>
            <p>ID: {folder.id}</p>
            <p>Mime Type: {folder.mimeType}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default DriveFiles;
