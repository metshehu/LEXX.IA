import { useEffect, useState } from "react";
import { Search } from "lucide-react"; // Optional: install `lucide-react` for icons
import { SearchPopUps } from "./SearchPopUps";
import { useAuth } from "@/components/auth/AuthProvider";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [empty, setEmpty] = useState(true);
  const { isAuthenticated } = useAuth();

  const handleSearch = () => {
    console.log("Searching for:", query);
  };

  useEffect(() => {
    if (query.length != 0 && isAuthenticated) {
      setEmpty(false);
      setSuggestions(["fill.CV","2fill.Cv","Fill.CV","fill3"]); // Set your data here
    } else {
      setSuggestions(() => []);
      setEmpty(() => true);
    }
  }, [query, isAuthenticated]);

  return (
    <>
      <div className="w-full  mt-[50px] flex justify-center">
        <div className="flex items-center bg-white rounded-full shadow-lg px-4 py-2 w-[600px] max-w-full">
          <Search className="text-gray-500 mr-2" />
          <input
            type="text"
            className="flex-grow outline-none text-sm text-black placeholder:text-gray-500"
            placeholder={isAuthenticated ? "What are you looking for?" : "Please sign in to search"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={!isAuthenticated}
          />
          <button
            onClick={handleSearch}
            className="ml-4 bg-[#7700ff] hover:bg-[#5c00cc] text-white font-medium px-5 py-2 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isAuthenticated}
          >
            Search ✨
          </button>
        </div>
      </div>
      {!empty && isAuthenticated && (
        <div>
        </div>
      )}
      {suggestions.length > 0 && isAuthenticated && (
        <SearchPopUps suggestions={suggestions} />
      )}
    </>
  );
}
