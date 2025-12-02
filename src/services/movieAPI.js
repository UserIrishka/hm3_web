// Вариант с NewsAPI
const API_KEY = '2f92c4c3' 
const BASE_URL = 'https://www.omdbapi.com/'


export const movieAPI = {
  // Поиск фильмов по названию
  async searchMovies(query, page = 1) {
    try {
      const response = await fetch(
        `${BASE_URL}?s=${encodeURIComponent(query)}&page=${page}&apikey=${API_KEY}`
      )
      
      if (!response.ok) {
        throw new Error('Ошибка сети')
      }
      
      const data = await response.json()
      
      if (data.Response === 'False') {
        throw new Error(data.Error || 'Фильмы не найдены')
      }
      
      // Преобразуем данные в удобный формат
      return data.Search.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        type: movie.Type,
        poster: movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.jpg',
        imdbID: movie.imdbID
      }))
      
    } catch (error) {
      console.error('Movie search error:', error)
      throw new Error(error.message || 'Ошибка при поиске фильмов')
    }
  },

  // Получение детальной информации о фильме
  async getMovieDetails(id) {
    try {
      const response = await fetch(
        `${BASE_URL}?i=${id}&plot=full&apikey=${API_KEY}`
      )
      
      if (!response.ok) {
        throw new Error('Ошибка сети')
      }
      
      const data = await response.json()
      
      if (data.Response === 'False') {
        throw new Error(data.Error || 'Информация о фильме не найдена')
      }
      
      return {
        id: data.imdbID,
        title: data.Title,
        year: data.Year,
        rated: data.Rated,
        released: data.Released,
        runtime: data.Runtime,
        genre: data.Genre,
        director: data.Director,
        writer: data.Writer,
        actors: data.Actors,
        plot: data.Plot,
        language: data.Language,
        country: data.Country,
        awards: data.Awards,
        poster: data.Poster !== 'N/A' ? data.Poster : '/placeholder-movie.jpg',
        ratings: data.Ratings || [],
        metascore: data.Metascore,
        imdbRating: data.imdbRating,
        imdbVotes: data.imdbVotes,
        type: data.Type,
        boxOffice: data.BoxOffice
      }
      
    } catch (error) {
      console.error('Movie details error:', error)
      throw new Error(error.message || 'Ошибка при получении информации о фильме')
    }
  },

  // Поиск фильмов по разным параметрам
  async searchByType(query, type = 'movie', page = 1) {
    try {
      const response = await fetch(
        `${BASE_URL}?s=${encodeURIComponent(query)}&type=${type}&page=${page}&apikey=${API_KEY}`
      )
      
      const data = await response.json()
      
      if (data.Response === 'False') {
        return []
      }
      
      return data.Search.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        type: movie.Type,
        poster: movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.jpg'
      }))
      
    } catch (error) {
      console.error('Search by type error:', error)
      return []
    }
  }
}

// Вспомогательные функции
export function formatRating(rating) {
  if (!rating || rating === 'N/A') return 'Нет оценки'
  return `${rating}/10`
}

export function formatRuntime(runtime) {
  if (!runtime || runtime === 'N/A') return 'Неизвестно'
  return runtime
}

export function formatBoxOffice(boxOffice) {
  if (!boxOffice || boxOffice === 'N/A') return 'Неизвестно'
  return boxOffice
}