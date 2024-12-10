import PropTypes from "prop-types";
import { FolderIcon, LockedFolderIcon } from "./Icons";

const Folder = ({
  permissions,
  item,
  onFolderClick,
  truncateString,
  currentFolderId,
  rootFolderId,
}) => {
  const isRootLevel = currentFolderId === rootFolderId;

  const hasFolderAccess = isRootLevel
    ? permissions?.some(
        (permission) =>
          permission.folderId === item.id && permission.hasAccess === 1
      )
    : true;

  return (
    <div
      title={item.name}
      onClick={hasFolderAccess ? () => onFolderClick(item.id) : undefined}
      className={`${hasFolderAccess ? "cursor-pointer" : "cursor-not-allowed"}`}
      role="button"
      aria-label={`Open folder ${item.name}`}
      aria-expanded="false"
    >
      {hasFolderAccess ? <FolderIcon /> : <LockedFolderIcon />}
      <strong className="text-wrap">{truncateString(item.name, 10)}</strong>
    </div>
  );
};

Folder.propTypes = {
  permissions: PropTypes.any,
  item: PropTypes.any,
  currentFolderId: PropTypes.any,
  rootFolderId: PropTypes.any,
  onFolderClick: PropTypes.func,
  truncateString: PropTypes.func,
};

export default Folder;
