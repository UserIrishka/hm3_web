<template>
  <div class="home">
    <div class="hero">
      <h1>Welcome to New service for anything</h1>
      <p>Исследуйте возможности различных API в одном приложении</p>
    </div>

    <div class="features">
      <div class="feature-card">
        <h3>🌤️ Погода</h3>
        <p>Узнайте текущую погоду в любом городе мира</p>
        <router-link to="/weather" class="btn">Перейти к погоде</router-link>
      </div>

      <div class="feature-card">
        <h3>🎬 Фильмы</h3>
        <p>Поиск информации о фильмах и сериалах</p>
        <router-link to="/movies" class="btn">Перейти к фильмам</router-link>
      </div>

      <div class="feature-card">
        <h3>📚 Книги</h3>
        <p>Поиск информации о книгах</p>
        <router-link to="/books" class="btn">Перейти к книгам</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 15px;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.btn {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s;
}

.btn:hover {
  background: #2980b9;
}
</style>
