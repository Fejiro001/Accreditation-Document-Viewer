import PropTypes from "prop-types";

const SearchBar = ({ searchQuery, handleSearchChange }) => {
  return (
    <div className="flex w-full max-w-[40rem]">
      <input
        aria-label="Search files and folders"
        className=" py-2 w-full px-4 rounded-md focus:outline focus:outline-primary-color shadow-md"
        type="text"
        placeholder="Search for files"
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
