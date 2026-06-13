import React,{useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SearchBtn() {

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

useEffect(() => {

    if (!location.search.includes("search=")) {
        setSearchQuery("");
    }

}, [location.search]);


  const handleSearch = () => {

      if (!searchQuery.trim()) {
        alert("searchQuery is required")
        return;
    }

    navigate(`/all-posts?search=${searchQuery}`)

  };

  return (
    <>
      <input
        type="text"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 rounded-lg"
      />

      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg cursor-pointer"
      >
        Search
      </button>
    </>
  );
}