<template>
  <header>
    <div id="layout"></div>
    <div class="wrapper">
      <nav>
        <h1>Hyper Book</h1>
        <RouterLink :to="{ name: 'account' }">Mon compte</RouterLink> |
        <RouterLink :to="{ name: 'home' }">Home</RouterLink> |
        <RouterLink :to="{ name: 'book-list' }">Books</RouterLink> |
        <RouterLink :to="{ name: 'add-book' }">Add book</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
#layout {
  text-align: center;
  font-family: Avenir, Arial, Helvetica, sans-serif;
  -webkit-font-feature-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
nav {
  padding: 30px;

  font-family: Avenir, Arial, Helvetica, sans-serif;
}
nav {
  padding: 5px;
}

nav a {
  font-weight: bold;
  color: #439482;
  text-decoration: none;
}
nav a.router-link-exact-active {
  color: #42b983;
}

nav a {
  font-weight: bold;

  color: #212c27;
}
</style>
