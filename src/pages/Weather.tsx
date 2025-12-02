import { useState } from 'react';
import './Weather.css';

// Типы для данных о погоде
interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    description: string;
    icon: string;
    main: string;
  }>;
  wind: {
    speed: number;
  };
}

const API_KEY = "ac4a5ed392abdae7603f78821737a8a3";

export default function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Проверяем, солнечная ли погода
  const isSunny = weatherData && 
    (weatherData.weather[0]?.icon === '01d' || 
     weatherData.weather[0]?.icon === '01n');

  // Получаем URL иконки
  const iconSrc = weatherData && !isSunny
    ? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    : '';

  const sunnyEmoji = '☀️';

  const searchWeather = async () => {
    if (!city.trim()) {
      setError('Пожалуйста, введите название города!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`
      );

      if (!response.ok) {
        throw new Error('Город не найден. Проверьте название и попробуйте снова.');
      }

      const data: WeatherData = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchWeather();
    }
  };

  return (
    <div className="weather-container">
      <h1>Погода в городе</h1>
      <div className="search-box">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Введите название города (например, Moscow или Москва)"
        />
        <button onClick={searchWeather} disabled={!city}>
          Поиск
        </button>
      </div>

      {!weatherData && !loading && !error && (
        <div className="welcome-card">
          <div className="welcome-icon">
            <img
              src="https://openweathermap.org/img/wn/02d@2x.png"
              alt="Частично облачно"
            />
          </div>
          <h2>Добро пожаловать в поиск погоды!</h2>
          <p>Введите название города в поле выше, чтобы узнать текущую погоду.</p>
        </div>
      )}

      {loading && <div className="loading">Загрузка погоды... ⛅️</div>}
      {error && <div className="error">{error}</div>}

      {weatherData && (
        <div className="weather-card">
          <div className="city-name">
            {weatherData.name}, {weatherData.sys.country}
          </div>
          <div className="weather-icon">
            {isSunny ? (
              <span className="sunny-emoji">{sunnyEmoji}</span>
            ) : (
              <img src={iconSrc} alt={weatherData.weather[0].description} />
            )}
          </div>
          <div className="temperature">
            {Math.round(weatherData.main.temp)}°C
          </div>
          <div className="description">
            {weatherData.weather[0].description}
          </div>
          <div className="details">
            <div>Влажность: {weatherData.main.humidity}%</div>
            <div>Ветер: {weatherData.wind.speed} м/с</div>
            <div>Давление: {weatherData.main.pressure} гПа</div>
          </div>
        </div>
      )}
    </div>
  );
}