import { useState, useEffect } from 'react';
import './App.css';
import Search from './assets/Search';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const BASE_URL = "https://www.omdbapi.com/";

function App() {
  const [searchitem, setsearchitem] = useState('');
  const [errormessage, seterrormessage] = useState('');
  const [movies, setMovies] = useState([]);

  const fetchMovies = async (query = "Avengers") => {
    try {
      const response = await fetch(`${BASE_URL}?s=${query}&apikey=${API_KEY}`);
      if (!response.ok) throw new Error("Failed to fetch movies");

      const data = await response.json();
      if (data.Response === "False") throw new Error(data.Error);

      setMovies(data.Search || []);
      seterrormessage('');
    } catch (error) {
      seterrormessage(error.message || "Failed to fetch movies");
      setMovies([]);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchitem.trim()) {
        fetchMovies(searchitem);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchitem]);

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center items-start pt-10">
      <div className="flex flex-col items-center max-w-xl">
        <img
          src="/images/images.jpeg"
          alt="header"
          className="w-[600px]"
        />
        <p className="text-center text-white text-xl mt-6 px-4">
          Welcome to <span className="text-red-500 font-semibold">CineWorld</span> — your one-stop hub for trending movies, top-rated films, and upcoming releases.
        </p>

        <Search searchitem={searchitem} setsearchitem={setsearchitem} />

        {errormessage && (
          <p className="text-red-500 mt-4">{errormessage}</p>
        )}

        {movies.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-6">
            {movies.map((movie) => (
              <div key={movie.imdbID} className="bg-white p-4 rounded shadow hover:shadow-lg">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "/images/placeholder.png"}
                  alt={movie.Title}
                  className="w-full h-72 object-cover rounded mb-2"
                />
                <h3 className="text-lg font-bold">{movie.Title}</h3>
                <p className="text-sm text-gray-700">{movie.Year}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
