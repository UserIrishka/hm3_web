import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./Home";
import Books from "./Books";
import Weather from "./Weather";
import Movies from "./Movies";
import "./App.css";

export default function App() {
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-text">🌐 API Hub</span>
          </div>
          <div className="nav-links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <span className="nav-icon">🏠</span>
              <span className="nav-text">Главная</span>
            </NavLink>

            <NavLink
              to="/weather"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <span className="nav-icon">🌤️</span>
              <span className="nav-text">Погода</span>
            </NavLink>

            <NavLink
              to="/books"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <span className="nav-icon">📚</span>
              <span className="nav-text">Книги</span>
            </NavLink>

            <NavLink
              to="/movies"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <span className="nav-icon">🎬</span>
              <span className="nav-text">Фильмы</span>
            </NavLink>
          </div>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </main>
    </>
  );
}
