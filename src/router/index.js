import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Movies from "../views/Movies.vue";
import Weather from "../views/Weather.vue";
import Books from "../views/Books.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/movies",
    name: "Movies",
    component: Movies,
  },
  {
    path: "/weather",
    name: "Weather",
    component: Weather,
  },
  {
    path: "/books",
    name: "Books",
    component: Books,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
