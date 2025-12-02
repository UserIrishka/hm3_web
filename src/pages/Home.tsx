import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to New service for anything</h1>
        <p>Исследуйте возможности различных API в одном приложении</p>
      </div>

      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">🌤️</div>
          <h3>Погода</h3>
          <p>Узнайте текущую погоду в любом городе мира</p>
          <Link to="/weather" className="btn">Перейти к погоде</Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🎬</div>
          <h3>Фильмы</h3>
          <p>Поиск информации о фильмах и сериалах</p>
          <button className="btn disabled">Скоро</button>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📚</div>
          <h3>Книги</h3>
          <p>Поиск информации о книгах</p>
          <Link to="/books" className="btn">Перейти к книгам</Link>
        </div>
      </div>

      <div className="about">
        <h2>О нашем сервисе</h2>
        <p>
          Это демонстрационное приложение, созданное с использованием React, TypeScript и Vite. 
          Оно демонстрирует работу с различными API и современными веб-технологиями.
        </p>
        <div className="tech-stack">
          <span className="tech-tag">React</span>
          <span className="tech-tag">TypeScript</span>
          <span className="tech-tag">Vite</span>
          <span className="tech-tag">CSS3</span>
          <span className="tech-tag">OpenWeather API</span>
        </div>
      </div>
    </div>
  );
}