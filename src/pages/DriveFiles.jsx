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
              {filteredFolders.map((item) => (
                <li
                  className="cursor-pointer *:flex *:flex-col *:gap-4 *:text-center w-28"
                  key={item.id}
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
