<script setup>
import { ref, onMounted } from 'vue'
import BookService from '@/services/BookService'
const book = ref(null)
const props = defineProps({
  id: {
    required: true
  }
})

onMounted(() => {
  BookService.getBook(props.id)
    .then((response) => {
      book.value = response.data.data
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
  <div class="book-card" v-if="book">
    <h2>{{ book.title }}</h2>
    <p>{{ book.numberOfPages }}</p>
    <p>{{ book.abstract }}</p>
  </div>
</template>

<style scoped></style>
