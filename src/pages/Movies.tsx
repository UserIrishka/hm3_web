import React, { useState } from "react";
import "./Movies.css";

interface Movie {
  id: string;
  title: string;
  year: string;
  type: string;
  poster: string;
}

interface MovieDetails {
  title: string;
  year: string;
  poster: string;
  imdbRating: string;
  runtime: string;
  rated: string;
  genre: string;
  plot: string;
  director: string;
  actors: string;
  country: string;
  language: string;
  boxOffice: string;
  awards: string;
}

const API_KEY = "808fbcb9";
const BASE_URL = "http://www.omdbapi.com/";

const Movies: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [movieDetailsLoading, setMovieDetailsLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovies = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const params = new URLSearchParams({
        apikey: API_KEY,
        s: searchQuery,
      });

      const response = await fetch(`${BASE_URL}?${params}`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(
          (data.Search || []).map((item: any) => ({
            id: item.imdbID,
            title: item.Title,
            year: item.Year,
            type: item.Type,
            poster: item.Poster,
          }))
        );
      } else {
        setMovies([]);
        setError(data.Error || "Фильмы не найдены");
      }
    } catch (err) {
      setError("Ошибка сети");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const showMovieDetails = async (movie: Movie) => {
    setSelectedMovie(movie);
    setMovieDetailsLoading(true);
    setMovieDetails(null);

    try {
      const response = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&i=${movie.id}&plot=full`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovieDetails({
          title: data.Title,
          year: data.Year,
          poster: data.Poster,
          imdbRating: data.imdbRating,
          runtime: data.Runtime,
          rated: data.Rated,
          genre: data.Genre,
          plot: data.Plot,
          director: data.Director,
          actors: data.Actors,
          country: data.Country,
          language: data.Language,
          boxOffice: data.BoxOffice,
          awards: data.Awards,
        });
      } else {
        setMovieDetails(null);
      }
    } catch (err) {
      console.error("Error loading movie details:", err);
    } finally {
      setMovieDetailsLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setMovies([]);
    setError("");
  };

  const clearError = () => {
    setError("");
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setMovieDetails(null);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src =
      "https://via.placeholder.com/300x450/dfe6e9/636e72?text=No+Poster";
  };

  const getTypeName = (type: string) => {
    const types: Record<string, string> = {
      movie: "Фильм",
      series: "Сериал",
    };
    return types[type] || type;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchMovies();
    }
  };

  return (
    <div className="movies-page">
      <div className="movies-container">
        <header className="movies-header">
          <h1>🎬 Поиск фильмов</h1>
          <p className="subtitle">
            Найдите информацию о любом фильме или сериале
          </p>
        </header>

        <div className="search-section">
          <div className="search-box">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Введите название фильма..."
              className="search-input"
            />
            <button
              onClick={searchMovies}
              className="search-btn"
              disabled={loading}
            >
              {loading ? "Поиск..." : "Найти"}
            </button>
          </div>
          <button onClick={clearSearch} className="clear-btn">
            Очистить
          </button>
        </div>

        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Ищем фильмы...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <h3>Ничего не найдено</h3>
            <p>{error}</p>
            <button onClick={clearError} className="retry-btn">
              Попробовать снова
            </button>
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="welcome-message">
            <div className="welcome-content">
              <h3>Добро пожаловать в поиск фильмов!</h3>
              <p>
                Введите название фильма или сериала в поисковую строку
                выше
              </p>
            </div>
          </div>
        )}

        {!loading && !error && movies.length > 0 && (
          <div className="movies-content">
            <div className="results-section">
              <div className="results-header">
                <h3>Найдено фильмов: {movies.length}</h3>
              </div>

              <div className="movies-grid">
                {movies.map((movie) => (
                  <div
                    key={movie.id}
                    className="movie-card"
                    onClick={() => showMovieDetails(movie)}
                  >
                    <div className="movie-poster">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        onError={handleImageError}
                      />
                      <div className="movie-year">{movie.year}</div>
                    </div>
                    <div className="movie-info">
                      <h3 className="movie-title">{movie.title}</h3>
                      <p className="movie-type">
                        {getTypeName(movie.type)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedMovie && (
          <div className="modal-overlay" onClick={closeModal}>
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-btn" onClick={closeModal}>
                ×
              </button>

              {movieDetailsLoading && (
                <div className="loading-details">
                  <div className="spinner"></div>
                  <p>Загружаем информацию...</p>
                </div>
              )}

              {!movieDetailsLoading && movieDetails && (
                <div className="movie-details">
                  <div className="details-header">
                    <img
                      src={movieDetails.poster}
                      alt={movieDetails.title}
                      className="detail-poster"
                      onError={handleImageError}
                    />
                    <div className="details-main">
                      <h2>
                        {movieDetails.title} ({movieDetails.year})
                      </h2>
                      <div className="details-meta">
                        {movieDetails.imdbRating &&
                          movieDetails.imdbRating !== "N/A" && (
                            <span className="rating">
                              ⭐ {movieDetails.imdbRating}/10
                            </span>
                          )}
                        {movieDetails.runtime &&
                          movieDetails.runtime !== "N/A" && (
                            <span className="runtime">
                              {movieDetails.runtime}
                            </span>
                          )}
                        {movieDetails.rated &&
                          movieDetails.rated !== "N/A" && (
                            <span className="rated">
                              {movieDetails.rated}
                            </span>
                          )}
                      </div>
                      <p className="genre">{movieDetails.genre}</p>
                      <p className="plot">{movieDetails.plot}</p>
                    </div>
                  </div>

                  <div className="details-info">
                    <div className="info-grid">
                      <div className="info-item">
                        <strong>Режиссер:</strong>
                        <span>{movieDetails.director || "Нет данных"}</span>
                      </div>
                      <div className="info-item">
                        <strong>Актеры:</strong>
                        <span>{movieDetails.actors || "Нет данных"}</span>
                      </div>
                      <div className="info-item">
                        <strong>Страна:</strong>
                        <span>{movieDetails.country || "Нет данных"}</span>
                      </div>
                      <div className="info-item">
                        <strong>Язык:</strong>
                        <span>{movieDetails.language || "Нет данных"}</span>
                      </div>
                      <div className="info-item">
                        <strong>Бюджет:</strong>
                        <span>{movieDetails.boxOffice || "Нет данных"}</span>
                      </div>
                      <div className="info-item">
                        <strong>Награды:</strong>
                        <span>{movieDetails.awards || "Нет данных"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
