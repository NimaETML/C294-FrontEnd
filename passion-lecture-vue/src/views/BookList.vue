<script setup>
import BookCard from '@/components/BookCard.vue'
import { onMounted, ref } from 'vue'
import BookService from '@/services/BookService'

const books = ref(null)

onMounted(() => {
  BookService.getBooks()
    .then((response) => {
      // Le backend nous retourne un objet contenant 2 entrées :
      // - msg qde confirmation
      // - data qui contient l'ensemble des livres
      books.value = response.data.data
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
  <h3>All books</h3>
  <div class="home">
    <div class="books-container">
      <BookCard v-for="book in books" :key="book.id" :book="book" />
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center; /* Center the book cards horizontally */
  overflow-x: hidden; /* Hide horizontal overflow */
}

.books-container {
  max-width: 100%;
  overflow-x: auto; /* Enable horizontal scrolling */
  display: flex;
  flex-wrap: wrap; /* Allow the books to wrap onto new lines */
  justify-content: center; /* Center the books horizontally */
}
</style>
