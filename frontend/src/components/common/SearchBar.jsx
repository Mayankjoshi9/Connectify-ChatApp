
import { FaSearch } from "react-icons/fa";
import PropTypes from 'prop-types';


const SearchBar = ({ query, handleInputChange, loadingSearch, error }) => {
  return (

    <div className="w-full h-[65px] flex flex-col relative bg-search p-1 ">
      <div className="flex justify-center items-center w-full  h-full   ">

        <input
          type="text"
          placeholder="Search for users..."
          value={query}
          onChange={handleInputChange}
          className="h-full w-full pl-[20px] bg-input  outline-none text-white "

        />

        {loadingSearch && <p className="loader w-1 h-1" ></p>}
        {error && <p>{error}</p>}

        {!loadingSearch && <button className="flex ">
          <FaSearch className="text-xl text-white text-center absolute right-7 top-4" />
        </button>}
      </div>
    </div>

  )
}


SearchBar.propTypes = {
  query: PropTypes.string.isRequired,            // query is expected to be a string and is required
  handleInputChange: PropTypes.func.isRequired,  // handleInputChange is expected to be a function and is required
  loadingSearch: PropTypes.bool.isRequired,      // loadingSearch is expected to be a boolean and is required
  error: PropTypes.string,                       // error is expected to be a string, and it is optional
};
export default SearchBar