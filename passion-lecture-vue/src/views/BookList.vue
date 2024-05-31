<script setup>
import BookCard from '@/components/BookCard.vue'
import { onMounted, ref } from 'vue'
import BookService from '@/services/BookService'

const books = ref(null)

onMounted(() => {
  BookService.getBooks()
    .then((response) => {
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
    <BookCard v-for="book in books" :key="book.id" :book="book" />
  </div>
</template>
<style scoped>
.home {
  display: flex;
  align-items: center;
}
</style>
