import axios from "axios";
import { useEffect, useState } from "react";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
import { useNavigate, useParams } from "react-router-dom";
import FileViewer from "../components/FileViewer";
import File from "../components/File";
import Folder from "../components/Folder";
import SearchBar from "../components/SearchBar";

function DriveFiles() {
  const [folders, setFolders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [fileName, setFileName] = useState(null);
  const navigate = useNavigate();
  const { folderId } = useParams();
  const [viewerOpen, setViewerOpen] = useState(false);
  // const [breadcrumbs, setBreadcrumbs] = useState([]);

  const ROOT_FOLDER_ID = "1oOdXdyN1-_1HRGndMvphkz1M-NeIITyd";

  useEffect(() => {
    if (folderId) {
      fetchFolders(folderId);
    } else {
      fetchFolders(ROOT_FOLDER_ID);
    }
  }, [folderId]);

  // Fetch folder data based on current folder ID
  const fetchFolders = async (folderId) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/folders/${folderId}`);
      setFolders(response.data);
    } catch (error) {
      console.error("Error fetching folders: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch search results
  const filterFolders = (query) => {
    if (!query) return folders;
    return folders.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle clicking folder
  const handleFolderClick = (folderId) => {
    fetchFolders(folderId);
    navigate(`/folder/${folderId}`);
  };

  const handleFileClick = (fileName, fileContent) => {
    setFileName(fileName);
    setContent(fileContent);
    setViewerOpen(true);
  };

  const handleClose = () => {
    setViewerOpen(false);
  };

  const filteredFolders = filterFolders(searchQuery);

  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + "...";
    }
    return str;
  };

  return (
    <AuthenticatedLayout>
      {/* File View */}
      {viewerOpen && (
        <FileViewer
          fileName={fileName}
          content={content}
          onClose={handleClose}
        />
      )}

      {/* Search Bar */}
      <div className="m-4 w-96">
        <SearchBar
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
        />
      </div>

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
