<script setup>
import { ref, onMounted } from 'vue'
import BookService from '@/services/BookService'
const book = ref(null)
const category = ref(null)
const author = ref(null)
const props = defineProps({
  id: {
    required: true
  }
})

onMounted(async () => {
  try {
    const infoBook = await BookService.getBook(props.id)
    book.value = infoBook.data.data
    const infoCategory = await BookService.getCategory(book.value.categoryId)
    category.value = infoCategory.data.data
    const infoAuthor = await BookService.getWriter(book.value.writerId)
    author.value = infoAuthor.data.data
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div class="book-card" v-if="book">
    <h2>{{ book.title }}</h2>
    <img :src="book.book_cover" />
    <p>Summary: {{ book.summary }}</p>
    <h3>Category: {{ category ? category.name : 'Loading...' }}</h3>
    <p>
      Writer : {{ author ? author.firstName : 'Loading...' }}
      {{ author ? author.lastName : 'Loading...' }}
    </p>
    <p>Publisher: {{ book.publisher }}</p>
    <p>Pages: {{ book.number_of_pages }}</p>

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
