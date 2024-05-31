<template>
  <header>
    <div class="wrapper">
      <div class="logo">
        <h1>Hyper Book</h1>
      </div>
      <nav>
        <RouterLink :to="{ name: 'account' }">Mon compte</RouterLink>
        <RouterLink :to="{ name: 'home' }">Home</RouterLink>
        <RouterLink :to="{ name: 'book-list' }">Books</RouterLink>
        <RouterLink :to="{ name: 'add-book' }">Add book</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
header {
  background: rgb(0, 143, 0);
  background: linear-gradient(90deg, rgb(86, 201, 255) 0%, rgb(27, 255, 122) 100%);
  color: rgb(0, 86, 126);
  padding: 10px 20px;
  border-bottom: 2px solid hsla(160, 100%, 37%, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo h1 {
  font-family: 'Arial', sans-serif;
  font-size: 24px;
  font-weight: bold;
}

nav {
  display: flex;
  gap: 15px;
}

nav a {
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  color: rgb(0, 86, 126);
  text-decoration: none;
  padding: 5px 10px;
  transition:
    background 0.3s ease,
    color 0.3s ease;
}

nav a.router-link-exact-active {
  color: #070068;
}

nav a:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #0084b8;
  border-radius: 4px;
}
</style>
