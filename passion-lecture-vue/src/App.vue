<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div id="layout">
      <div class="wrapper">
        <nav>
          |
          <RouterLink to="/">Home</RouterLink>
          |
          <RouterLink to="/Books">Books</RouterLink>
          |
          <RouterLink to="">Add book</RouterLink>
          |
          <RouterLink to="">Edit book</RouterLink>
          |
          <RouterLink to="">Drop book</RouterLink>
          |
          <RouterLink to="">Book Details</RouterLink>
          |
          <RouterLink to="/LogIn">Log in</RouterLink>
          |
          <RouterLink to="/SignIn">Sign in</RouterLink>
          |
          <!-- LE FAIRE ALLER A DROITE -->
          <RouterLink to="{ name: 'account' }" id="user-right"
            ><img src="./assets/images/UserIcon.png" alt="Icon utilisateur" width="40" height="40"
          /></RouterLink>
        </nav>
      </div>
    </div>
  </header>

  <RouterView />
  <!-- espace résérvé pour le contenue du composant "view", sera replacer par le composant de la route chargée -->
</template>
<!-- composant de la library vue-router, crée un lien vers une route spécifique -->

<!-- font size pour toute l'app -->
<style>
h1 {
  font-size: 40px;
}

h2 {
  font-size: 26px;
}

#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<style scoped>
#layout {
  text-align: left;
  font-family: Avenir, Arial, Helvetica, sans-serif;
  -webkit-font-feature-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#user-right {
  text-align: right;
}

#nav {
  padding: 30px;

  font-family: Avenir, Arial, Helvetica, sans-serif;
}
nav {
  padding: 20px 10px 30px 10px;
}

nav {
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
