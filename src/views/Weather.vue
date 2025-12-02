<template>
  <div class="weather-container">
    <h1>Погода в городе</h1>
    <div class="search-box">
      <input
        v-model="city"
        type="text"
        placeholder="Введите название города (например, Moscow или Москва)"
        @keyup.enter="searchWeather"
      />
      <button @click="searchWeather" :disabled="!city">Поиск</button>
    </div>

    <div v-if="!weatherData && !loading && !error" class="welcome-card">
      <div class="welcome-icon">
        <img
          src="https://openweathermap.org/img/wn/02d@2x.png"
          alt="Частично облачно"
        />
      </div>
      <h2>Добро пожаловать в поиск погоды!</h2>
      <p>Введите название города в поле выше, чтобы узнать текущую погоду.</p>
    </div>

    <div v-if="loading" class="loading">Загрузка погоды... ⛅️</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="weatherData" class="weather-card">
      <div class="city-name">
        {{ weatherData.name }}, {{ weatherData.sys.country }}
      </div>
      <div class="weather-icon">
        <span v-if="isSunny" class="sunny-emoji">{{ sunnyEmoji }}</span>
        <img v-else :src="iconSrc" :alt="weatherData.weather[0].description" />
      </div>
      <div class="temperature">{{ Math.round(weatherData.main.temp) }}°C</div>
      <div class="description">{{ weatherData.weather[0].description }}</div>
      <div class="details">
        <div>Влажность: {{ weatherData.main.humidity }}%</div>
        <div>Ветер: {{ weatherData.wind.speed }} м/с</div>
        <div>Давление: {{ weatherData.main.pressure }} гПа</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const API_KEY = "ac4a5ed392abdae7603f78821737a8a3";
const city = ref("");
const weatherData = ref(null);
const loading = ref(false);
const error = ref("");
const sunnyEmoji = "☀️";
const isSunny = computed(() => {
  return (
    weatherData.value &&
    (weatherData.value.weather[0]?.icon === "01d" ||
      weatherData.value.weather[0]?.icon === "01n")
  );
});
const iconSrc = computed(() => {
  if (
    weatherData.value &&
    weatherData.value.weather[0]?.icon &&
    !isSunny.value
  ) {
    return `https://openweathermap.org/img/wn/${weatherData.value.weather[0].icon}@2x.png`;
  }
  return "";
});
const searchWeather = async () => {
  if (!city.value.trim()) {
    error.value = "Пожалуйста, введите название города!";
    return;
  }
  loading.value = true;
  error.value = "";
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${API_KEY}&units=metric&lang=ru`
    );
    if (!response.ok) {
      throw new Error(
        "Город не найден. Проверьте название и попробуйте снова."
      );
    }
    weatherData.value = await response.json();
  } catch (err) {
    error.value = err.message;
    weatherData.value = null;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.welcome-card {
  background: white;
  color: black;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  max-width: 400px;
  margin: 2rem auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.welcome-icon {
  margin-bottom: 1rem;
  display: block;
  text-align: center;
}

.welcome-icon img {
  width: 100px;
  height: 100px;
}

.welcome-card h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: black;
  font-weight: bold;
}

.welcome-card p {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #333;
  line-height: 1.4;
}

.weather-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
  min-height: 400px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.search-box {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.loading,
.error {
  text-align: center;
  font-size: 18px;
  margin: 20px 0;
}

.error {
  color: #ff6b6b;
}

.weather-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  backdrop-filter: blur(10px);
}

.city-name {
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: bold;
  text-transform: capitalize;
}

.weather-icon img {
  width: 100px;
  height: 100px;
}

.sunny-emoji {
  font-size: 80px;
  display: block;
  text-align: center;
}

.temperature {
  font-size: 48px;
  margin: 10px 0;
  font-weight: bold;
}

.description {
  font-size: 24px;
  text-transform: capitalize;
  margin: 10px 0;
}

.details {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  font-size: 16px;
}

@media (max-width: 600px) {
  .search-box {
    flex-direction: column;
  }
  .details {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
