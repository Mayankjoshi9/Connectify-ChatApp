import { useSelector } from 'react-redux'
import PropTypes from 'prop-types';


const SearchResults = ({ query, results, handleSession, loadingSearch }) => {
  const curruser = useSelector((state) => state.auth.user);
 

  return (
    <>
      {query != "" && (<div className="w-full h-full overflow-y-auto">
        {results.length > 0 ? (
          <ul className="space-y-2">
            {results.map((user) => (
              <button
                onClick={() => handleSession(user)}
                key={user._id}
                className={`border-b border-primary w-full h-[20%] py-3 px-4 bg-[#2a3942] text-white rounded-b-lg hover:bg-[#3c4f55] transition-colors duration-200 flex items-center space-x-2 ${user._id == curruser._id ? "hidden" : ""}`}
              >
                <div  className="flex gap-5 w-[400px] h-full ">
                  <div className="bg-[#3b4a54] h-10 w-10 rounded-full flex items-center justify-center">
                    {/* Placeholder for user initials or avatar */}
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{user.name}

                    </p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>

                
              </button>
            ))}
          </ul>
        ) : (
          query && !loadingSearch && (
            <p className="w-full h-full bg-[#2a3942] text-white flex justify-center items-center rounded-lg">
              No results found
            </p>
          )
        )}
      </div>)}
    </>
  )
}

SearchResults.propTypes = {
  query: PropTypes.string.isRequired,  // Ensure 'query' is defined and is a string
  results: PropTypes.array.isRequired,
  handleSession: PropTypes.func.isRequired,
  loadingSearch: PropTypes.bool.isRequired,
};

export default SearchResults;