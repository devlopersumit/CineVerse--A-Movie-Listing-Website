import MovieCard from "../Components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import '../css/Home.css'

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [featuredMovie, setFeaturedMovie] = useState(null);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
        // Set the first movie as featured
        if (popularMovies.length > 0) {
          setFeaturedMovie(popularMovies[0]);
        }
      } catch (err) {
        setError("Failed to load movies. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setFeaturedMovie(null); // Clear featured movie when searching
    } catch (err) {
      setError("Failed to search movies. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {featuredMovie && (
        <div 
          className="featured-movie"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`
          }}
        >
          <div className="featured-content">
            <h1 className="featured-title">{featuredMovie.title}</h1>
            <p className="featured-overview">{featuredMovie.overview}</p>
            <div className="featured-meta">
              <span className="rating">⭐ {featuredMovie.vote_average.toFixed(1)}</span>
              <span className="release-date">{featuredMovie.release_date?.split("-")[0]}</span>
            </div>
          </div>
        </div>
      )}

      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for movies..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">
            <span className="search-icon">🔍</span>
            Search
          </button>
        </form>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loading">Loading movies...</div>
        </div>
      )}
      
      {error && (
        <div className="error-container">
          <div className="error">{error}</div>
        </div>
      )}
      
      <div className="movies-section">
        <h2 className="section-title">
          {searchQuery ? `Search Results for "${searchQuery}"` : "Popular Movies"}
        </h2>
        <div className="movies-grid">
          {!loading && !error && movies.length === 0 && (
            <div className="no-results">No movies found</div>
          )}
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
