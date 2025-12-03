import React, { useState, useCallback } from "react";
import type { Book, SearchType } from "../services/bookAPI";
import { searchBooks as fetchBooks } from "../services/bookAPI";
import "./Books.css"; // Импорт стилей

const Books: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<SearchType>("title");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // Очистка поиска
  const clearSearch = useCallback(() => {
    setQuery("");
    setBooks([]);
    setError("");
    setHasSearched(false);
  }, []);

  // Функция поиска
  const searchBooksHandler = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setBooks([]);
    setHasSearched(true);

    try {
      const results = await fetchBooks(query, searchType, 20);
      setBooks(results);
      if (results.length === 0) setError("Ничего не найдено");
    } catch (err) {
      setError("Ошибка при загрузке данных");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchBooksHandler();
    }
  };

  return (
    <div className="books-page">
      <div className="books-container">
        <header className="books-header">
          <h1>📚 Поиск книг</h1>
          <p className="subtitle">Найдите информацию про любую книгу</p>
        </header>

        <div className="search-box">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Введите название книги или автора"
            onKeyDown={handleKeyDown}
          />
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as SearchType)}
          >
            <option value="title">По названию</option>
            <option value="author">По автору</option>
          </select>
          <button onClick={searchBooksHandler} disabled={!query || loading}>
            Поиск
          </button>
          {}
          {(query || hasSearched) && (
            <button
              onClick={clearSearch}
              disabled={loading}
              className="clear-btn"
            >
              Очистить
            </button>
          )}
        </div>

        {}
        {!books.length && !loading && !error && !hasSearched && (
          <div className="welcome-message">
            <div className="welcome-content">
              <div className="emoji">📖</div>
              <h3>Добро пожаловать в поиск книг!</h3>
              <p className="hint">
                Введите название книги или автора в поле выше. <br />
                Для более точного результата вводите названия на
                <span className="highlight"> английском языке </span>.
              </p>
            </div>
          </div>
        )}

        {loading && <div className="loading">Загрузка...</div>}
        {error && <div className="error">{error}</div>}

        {}
        {books.length > 0 && (
          <div className="books-list">
            {books.map((book) => (
              <div key={book.id} className="book-card">
                {}
                {book.cover ? (
                  <img src={book.cover} alt="Обложка книги" />
                ) : (
                  <div className="placeholder">Нет обложки</div>
                )}
                <h3>{book.title}</h3>
                <p>Автор: {book.author}</p>
                <p>Год: {book.year}</p>
              </div>
            ))}
          </div>
        )}

        {}
        {!loading && !error && hasSearched && books.length === 0 && (
          <div className="no-results">Ничего не найдено.</div>
        )}
      </div>
    </div>
  );
};

export default Books;
