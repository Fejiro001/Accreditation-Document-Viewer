import PropTypes from "prop-types";

const SearchBar = ({ searchQuery, handleSearchChange }) => {
  return (
    <div className="m-4 w-96">
      <input
        aria-label="Search files and folders"
        className=" py-2 w-full px-4 rounded-md"
        type="text"
        placeholder="Search for files and folders"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
};

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
};

export default SearchBar;
