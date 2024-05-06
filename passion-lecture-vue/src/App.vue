<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/EventCard.vue'
</script>

<template>
  <header>
    <div id="layout">
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink> | <RouterLink to="/Books">Books</RouterLink> |
          <RouterLink to="">Add book</RouterLink> | <RouterLink to="">Edit book</RouterLink> |
          <RouterLink to="">Drop book</RouterLink> |
          <RouterLink to="">Book Details</RouterLink>
        </nav>
      </div>
    </div>
  </header>

  <RouterView />
</template>

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
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a {
  font-weight: bold;
  color: #42b983;
}
</style>
