/* eslint-disable react/prop-types */
import { useState } from 'react'

function Folder({ folder, fetchFolderContents }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
      setIsOpen(!isOpen); // Toggle folder open/close
      fetchFolderContents(folder.id); // Fetch folder contents when clicked
    };
  
    return (
      <div>
        <div onClick={handleClick}>
          <strong>{folder.name}</strong>
        </div>
        {isOpen && folder.subfolders && folder.subfolders.length > 0 && (
          <div style={{ marginLeft: 20 }}>
            {folder.subfolders.map((subfolder) => (
              <Folder key={subfolder.id} folder={subfolder} fetchFolderContents={fetchFolderContents} />
            ))}
          </div>
        )}
        {isOpen && folder.files && folder.files.length > 0 && (
          <div style={{ marginLeft: 20 }}>
            {folder.files.map((file) => (
              <div key={file.id}>{file.name}</div>
            ))}
          </div>
        )}
      </div>
    );
}

export default Folder