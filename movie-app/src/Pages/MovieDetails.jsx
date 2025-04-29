import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/MovieDetails.css';

function MovieDetails() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch movie details
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=91b35eedc87966078f343d91a621bf4f`
        );
        if (!movieResponse.ok) throw new Error('Failed to fetch movie details');
        const movieData = await movieResponse.json();
        setMovie(movieData);

        // Fetch cast
        const castResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=91b35eedc87966078f343d91a621bf4f`
        );
        if (!castResponse.ok) throw new Error('Failed to fetch cast');
        const castData = await castResponse.json();
        setCast(castData.cast.slice(0, 6)); // Get top 6 cast members

      } catch (err) {
        setError('Failed to load movie details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <div className="loading">Loading movie details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!movie) return <div className="error">Movie not found</div>;

  return (
    <div className="movie-details">
      <div className="movie-hero" style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
      }}>
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        <div className="hero-content">
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title}
            className="movie-poster"
          />
          <div className="movie-info">
            <h1>{movie.title}</h1>
            <div className="movie-meta">
              <span className="release-date">{movie.release_date?.split("-")[0]}</span>
              <span className="rating">⭐ {movie.vote_average.toFixed(1)}/10</span>
              <span className="runtime">{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
            </div>
            <div className="genres">
              {movie.genres?.map(genre => (
                <span key={genre.id} className="genre-tag">{genre.name}</span>
              ))}
            </div>
            <p className="tagline">{movie.tagline}</p>
          </div>
        </div>
      </div>

      <div className="movie-content">
        <div className="overview-section">
          <h2>Overview</h2>
          <p className="overview">{movie.overview}</p>
        </div>

        <div className="cast-section">
          <h2>Top Cast</h2>
          <div className="cast-grid">
            {cast.map(actor => (
              <div key={actor.id} className="cast-member">
                <img 
                  src={actor.profile_path 
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : 'https://via.placeholder.com/200x300?text=No+Image'}
                  alt={actor.name}
                  className="cast-image"
                />
                <h3>{actor.name}</h3>
                <p>{actor.character}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="streaming-options">
          <h2>Where to Watch</h2>
          <div className="streaming-links">
            <a 
              href={`https://www.justwatch.com/in/movie/${movie.title.toLowerCase().replace(/\s+/g, '-')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="streaming-link"
            >
              Check Streaming Availability
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails; 