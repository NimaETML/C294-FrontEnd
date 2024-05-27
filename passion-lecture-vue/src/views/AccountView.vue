<script setup>
import { ref } from 'vue'
import BookService from '../services/BookService.js'

const users = ref(null)
const searchQuery = ref('')
const errorMessage = ref('')

const nickName = ref('')
const password = ref('')
const loginError = ref('')
const isAuthenticated = ref(!!localStorage.getItem('jwt'))

const login = async () => {
  try {
    const response = await BookService.login({
      nickName: nickName.value,
      password: password.value
    })

    if (response.data.token) {
      localStorage.setItem('jwt', response.data.token)
      loginError.value = ''
      isAuthenticated.value = true
      console.log('Login successful:', response.data.data)
    } else {
      loginError.value = 'Invalid nickname or password'
    }
  } catch (error) {
    console.log(error)
    loginError.value = 'An error occurred during login'
  }
}

const logout = () => {
  localStorage.removeItem('jwt')
  isAuthenticated.value = false
  nickName.value = ''
  password.value = ''
  users.value = null
  searchQuery.value = ''
  errorMessage.value = ''
  loginError.value = ''
}
</script>

<template>
  <div class="account">
    <h1>My Account</h1>
    <div v-if="isAuthenticated">
      <button @click="logout">Logout</button>
    </div>

    <div v-else>
      <form @submit.prevent="login">
        <label for="nickName">Nickname:</label>
        <input
          type="text"
          v-model="nickName"
          name="nickName"
          id="nickName"
          placeholder="Enter nickname"
          required
        />
        <label for="password">Password:</label>
        <input
          type="password"
          v-model="password"
          name="password"
          id="password"
          placeholder="Enter password"
          required
        />
        <input type="submit" value="Login" />
      </form>

      <div v-if="loginError" class="error">{{ loginError }}</div>
    </div>
  </div>
</template>

<style>
/*
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}*/
</style>
