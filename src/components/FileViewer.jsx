import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
const FileViewer = ({ content, fileName, onClose }) => {
  const containerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (containerRef.current === event.target && onClose) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div
      ref={containerRef}
      className="absolute w-full h-full min-h-screen bg-slate-500/40 flex items-center justify-center"
    >
      <div className="max-w-full my-8 mx-20 bg-white rounded-lg shadow-lg p-12">
        <div className="flex justify-between items-center gap-4">
          {fileName && (
            <div>
              <h2 className="text-xl font-bold mb-2">{fileName}</h2>
            </div>
          )}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700  font-bold"
          >
            Close
          </button>
        </div>

        {content && (
          <div className="w-full">
            <pre className="text-wrap">{content}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

FileViewer.propTypes = {
  content: PropTypes.string,
  fileName: PropTypes.string,
  viewUrl: PropTypes.string,
  onClose: PropTypes.func,
};

export default FileViewer;
