import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../css/MovieCard.css';

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if movie is in favorites
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.some(fav => fav.id === movie.id));
  }, [movie.id]);

  const handleMovieClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      const newFavorites = favorites.filter(fav => fav.id !== movie.id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {
      localStorage.setItem('favorites', JSON.stringify([...favorites, movie]));
    }
    
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="movie-card" onClick={handleMovieClick}>
      <div className="movie-poster">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title}
          className="poster-image"
        />
        <div className="movie-overlay">
          <button 
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={toggleFavorite}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
          <div className="release-date">
            {movie.release_date?.split("-")[0]}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
