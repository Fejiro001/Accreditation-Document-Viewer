import { useCallback, useEffect, useState } from "react";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
import { useNavigate, useParams } from "react-router-dom";
import { FileViewer, File, Folder, SearchBar, Loading } from "../components";
import { useAuth } from "../hooks/useAuth";
import { filterItems, truncateString } from "../utils/folderUtils";
import api from "../api";

function DriveFiles() {
  const [folders, setFolders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewerState, setViewerState] = useState({
    content: null,
    fileName: null,
    isOpen: false,
  });

  const navigate = useNavigate();
  const { folderId } = useParams();
  const { user } = useAuth();
  const ROOT_FOLDER_ID = import.meta.env.VITE_ROOT_FOLDER_ID;

  const fetchFolders = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await api.get(`/folders/${id}`);
      setFolders(response.data);
    } catch (error) {
      console.error("Error fetching folders: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFolders(folderId || ROOT_FOLDER_ID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderId, fetchFolders]);

  const handleFileClick = (fileName, fileContent, viewUrl) => {
    if (viewUrl) {
      window.open(viewUrl, "_blank");
      return;
    } else {
      setViewerState({ content: fileContent, fileName, isOpen: true });
    }
  };
  const filteredFolders = filterItems(folders, searchQuery);

  const handleKeyNavigation = (e, index) => {
    const items = document.querySelectorAll('li[tabindex="0"]');
    
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        if (index < items.length - 1) items[index + 1].focus();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (index > 0) items[index - 1].focus();
        break;
    }
  };

  return (
    <AuthenticatedLayout className={"items-center"}>
      {viewerState.isOpen && (
        <FileViewer
          {...viewerState}
          onClose={() => setViewerState((prev) => ({ ...prev, isOpen: false }))}
        />
      )}

      <SearchBar
        searchQuery={searchQuery}
        handleSearchChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Loading */}
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Folder and File List */}
          {filteredFolders.length === 0 ? (
            <div className="w-full text-center py-10 text-gray-500">
              No files or folders found
            </div>
          ) : (
            <ul className="flex flex-wrap gap-12 py-10 w-full justify-evenly">
              {filteredFolders.map((item, index) => (
                <li
                  className="cursor-pointer *:flex *:flex-col *:gap-4 *:text-center w-28 focus:bg-primary-color/10 hover:bg-primary-color/10 outline-none rounded-md py-2"
                  key={item.id}
                  tabIndex={0}
                  role={item.isFolder ? "button" : "link"}
                  aria-label={`${item.isFolder ? "Folder" : "File"}: ${
                    item.name
                  }`}
                  onKeyDown={(e) => {
                    handleKeyNavigation(e, index);
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      if (item.isFolder) {
                        navigate(`/folder/${item.id}`);
                      } else {
                        handleFileClick(item.name, item.content, item.viewUrl);
                      }
                    }
                  }}
                >
                  {item.isFolder ? (
                    <Folder
                      permissions={user?.permissions}
                      item={item}
                      onFolderClick={() => navigate(`/folder/${item.id}`)}
                      truncateString={truncateString}
                      currentFolderId={folderId || ROOT_FOLDER_ID}
                      rootFolderId={ROOT_FOLDER_ID}
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
          )}
        </>
      )}
    </AuthenticatedLayout>
  );
}

export default DriveFiles;
