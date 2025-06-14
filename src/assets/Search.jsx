function Search({ searchitem, setsearchitem }){
  return (
    <div className="relative mt-6">
      {/* Search Icon */}
      <i className="bx bx-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl"></i>

      {/* Input with left padding for the icon */}
      <input
        type="text"
        placeholder="Search movies..."
        value={searchitem}
        onChange={(e) => setsearchitem(e.target.value)}
        className="pl-10 pr-4 py-2 w-[300px] rounded-md border border-white bg-white text-black placeholder-gray-500"
      />
    </div>
  );
};

export default Search;