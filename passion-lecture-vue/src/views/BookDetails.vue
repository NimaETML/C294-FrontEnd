<script setup>
import { ref, onMounted } from 'vue'
import BookService from '@/services/BookService'
const book = ref(null)
const category = ref(null)

const props = defineProps({
  id: {
    required: true
  }
})

onMounted(() => {
  BookService.getBook(props.id)
    .then((response) => {
      book.value = response.data.data

      return BookService.getCategorie(book.value.categoryId)
    })
    .then((categoryResponse) => {
      category.value = categoryResponse.data.data
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
  <div class="book-card" v-if="book">
    <h2>{{ book.title }}</h2>
    <img :src="book.imagePath" />
    <h3>Category: {{ category ? category.name : 'Loading...' }}</h3>
    <h4>Writer : {{ book.editor }}</h4>
    <p>{{ book.abstract }}</p>
    <p>Pages: {{ book.numberOfPages }}</p>

    <RouterLink class="button-link" :to="{ name: 'edit-book' }">Edit this book</RouterLink>
  </div>
</template>

<style scoped>
.book-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 180px;
  padding-top: 0%;
}

.button-link {
  display: inline-block;
  padding: 10px 15px;
  background-color: #333a41;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: small;
}
</style>
