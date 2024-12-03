import { useEffect, useState } from "react";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
import { useNavigate, useParams } from "react-router-dom";
import FileViewer from "../components/FileViewer";
import File from "../components/File";
import Folder from "../components/Folder";
import SearchBar from "../components/SearchBar";
import api from "../api";

function DriveFiles() {
  const [folders, setFolders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const navigate = useNavigate();
  const { folderId } = useParams();

  const ROOT_FOLDER_ID = import.meta.env.VITE_ROOT_FOLDER_ID;

  useEffect(() => {
    if (folderId) {
      fetchFolders(folderId);
    } else {
      fetchFolders(ROOT_FOLDER_ID);
    }
  }, [folderId]);

  const fetchFolders = async (folderId) => {
    setLoading(true);
    try {
      const response = await api.get(`/folders/${folderId}`);
      setFolders(response.data);
    } catch (error) {
      console.error("Error fetching folders: ", error);
    } finally {
      setLoading(false);
    }
  };

  const filterFolders = (query) => {
    if (!query) return folders;
    return folders.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  };
  const filteredFolders = filterFolders(searchQuery);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFolderClick = (folderId) => {
    fetchFolders(folderId);
    navigate(`/folder/${folderId}`);
  };

  const handleFileClick = (fileName, fileContent, viewUrl) => {
    setFileName(fileName);
    setContent(fileContent);

    if (viewUrl) {
      window.open(viewUrl, "_blank");
      setViewerOpen(false);
    } else {
      setViewerOpen(true);
    }
  };

  const handleClose = () => {
    setViewerOpen(false);
  };

  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + "...";
    }
    return str;
  };

  return (
    <AuthenticatedLayout>
      {viewerOpen && (
        <FileViewer
          fileName={fileName}
          content={content}
          onClose={handleClose}
        />
      )}

      <SearchBar
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
      />

      {/* Folder and File List */}
      <ul className="flex flex-wrap gap-12 py-10 px-20 w-full justify-start">
        {filteredFolders.map((item) => (
          <li
            className="cursor-pointer *:flex *:flex-col *:gap-4 *:text-center w-28"
            key={item.id}
          >
            {item.isFolder ? (
              <Folder
                item={item}
                handleFolderClick={handleFolderClick}
                truncateString={truncateString}
              />
            ) : (
              <File
                item={item}
                handleFileClick={handleFileClick}
                truncateString={truncateString}
              />
            )}
          </li>
        ))}
      </ul>

      {/* Loading */}
      {loading && <div>Loading...</div>}
    </AuthenticatedLayout>
  );
}

export default DriveFiles;
