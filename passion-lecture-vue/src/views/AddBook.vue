<template>
  <main>
    <div class="add">
      <h2>Add a new book</h2>
      <form @submit.prevent="addBook" enctype="multipart/form-data">
        <input v-model="newBook.title" placeholder="Title" required />
        <input
          v-model="newBook.number_of_pages"
          type="number"
          placeholder="Number of Pages"
          required
        />
        <input v-model="newBook.publisher" placeholder="Publisher" required />
        <input
          v-model="newBook.year_of_publication"
          type="date"
          placeholder="Year of Publication"
          required
        />
        <textarea v-model="newBook.excerpt" placeholder="Excerpt" required></textarea>
        <textarea v-model="newBook.summary" placeholder="Summary" required></textarea>
        <input v-model="newBook.firstname" placeholder="Writer's Firstname" required />
        <input v-model="newBook.category_name" placeholder="Category Name" required />
        <input type="file" @change="handleFileUpload" required name="book_cover" />
        <button type="submit">Ajouter</button>
      </form>
      <router-link to="/">Retour</router-link>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BookService from '../services/BookService.js'
const router = useRouter()

const newBook = ref({
  title: '',
  number_of_pages: '',
  publisher: '',
  year_of_publication: '',
  excerpt: '',
  summary: '',
  book_cover: null,
  firstname: '',
  category_name: ''
})

function handleFileUpload(event) {
  newBook.value.book_cover = event.target.files[0]
}

async function addBook() {
  if (
    newBook.value.title &&
    newBook.value.number_of_pages &&
    newBook.value.publisher &&
    newBook.value.year_of_publication &&
    newBook.value.excerpt &&
    newBook.value.summary &&
    newBook.value.firstname &&
    newBook.value.category_name &&
    newBook.value.book_cover
  ) {
    try {
      // Obtener el writerId por firstname
      console.log('newBook.value.firstname:', newBook.value.firstname)
      const writerResponse = await BookService.getWriterByFirstname(newBook.value.firstname)
      console.log('writerResponse:', writerResponse.data.data)

      // Verifica si writerResponse.data e id existen
      if (!writerResponse.data.data || typeof writerResponse.data.data.id === 'undefined') {
        alert("L'écrivain n'existe pas. Merci de réessayer avec un autre identifiant.")
        return
      }

      const writerId = writerResponse.data.data.id
      console.log('writerId:', writerId)

      // Obtener el categoryId por name
      const categoryResponse = await BookService.getCategoryByName(newBook.value.category_name)
      console.log('categoryResponse:', categoryResponse.data.data)
      if (!categoryResponse.data.data || typeof categoryResponse.data.data.id === 'undefined') {
        alert("La catégorie n'existe pas. Merci de réessayer avec un autre identifiant.")
        return
      }
      const categoryId = categoryResponse.data.data.id

      //userId pris du token
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxNTcyMDgxMywiZXhwIjoxNzQ3Mjc4NDEzfQ.kNxNGu2qgxwhZKwDtwLQ3jX2ID12yNqJTT0deGwea54'
      const decodedToken = JSON.parse(atob(token.split('.')[1]))
      const userId = decodedToken.userId

      const formData = new FormData()
      formData.append('title', newBook.value.title)
      formData.append('number_of_pages', newBook.value.number_of_pages)
      formData.append('publisher', newBook.value.publisher)
      formData.append('year_of_publication', newBook.value.year_of_publication)
      formData.append('excerpt', newBook.value.excerpt)
      formData.append('summary', newBook.value.summary)
      formData.append('book_cover', newBook.value.book_cover)
      formData.append('userId', userId)
      formData.append('writerId', writerId)
      formData.append('categoryId', categoryId)

      const response = await BookService.createBook(formData)
      console.log('createBook response:', response.data)
      newBook.value = {
        title: '',
        number_of_pages: '',
        publisher: '',
        year_of_publication: '',
        excerpt: '',
        summary: '',
        book_cover: null,
        firstname: '',
        category_name: ''
      }
      router.push('/')
    } catch (error) {
      console.log(
        'Error lors de la créatiom du livre:',
        error.response ? error.response.data : error.message
      )
    }
  } else {
    alert('Veuillez remplir tous les champs.')
  }
}
</script>

<style scoped>
.add {
  margin: auto;
  width: 30%;
}
form {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
