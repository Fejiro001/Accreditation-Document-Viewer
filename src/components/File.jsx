import Proptypes from "prop-types";
import { FileIcon } from "./Icons";
const File = ({ item, handleFileClick, truncateString }) => {
  return (
    <div
      title={item.name}
      onClick={() => handleFileClick(item.name, item.content, item.viewUrl)}
    >
      <FileIcon />
      <strong className="text-wrap">{truncateString(item.name, 15)}</strong>
    </div>
  );
};

File.propTypes = {
  item: Proptypes.any,
  handleFileClick: Proptypes.func,
  truncateString: Proptypes.func,
};

export default File;
