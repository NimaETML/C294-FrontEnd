<template>
  <main>
    <div class="edit">
      <h2>Edit a book</h2>
      <form @submit.prevent="editBook" enctype="multipart/form-data">
        <input v-model="newBook.title" placeholder="Title" />
        <input v-model="newBook.number_of_pages" type="number" placeholder="Number of Pages" />
        <input v-model="newBook.publisher" placeholder="Publisher" />
        <input
          v-model="newBook.year_of_publication"
          type="date"
          placeholder="Year of Publication"
        />
        <textarea v-model="newBook.excerpt" placeholder="Excerpt"></textarea>
        <textarea v-model="newBook.summary" placeholder="Summary"></textarea>
        <input v-model="writerName" placeholder="Writer's Firstname" />
        <input v-model="catergoryName" placeholder="Category Name" />
        <input type="file" @change="handleFileUpload" name="book_cover" />
        <button type="submit">Ajouter</button>
      </form>
      <router-link to="/">Retour</router-link>
    </div>
  </main>
</template>

<script setup>
defineProps({
  BookId: {
    type: Number,
    required: true
  }
})
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BookService from '../services/BookService.js'

const route = useRoute()
const router = useRouter()
const newBook = ref({})
const writerName = ref({})
const catergoryName = ref({})

onMounted(() => {
  // Récupérer un livre
  BookService.getBook(route.params.id)
    .then((response) => {
      newBook.value = response.data.data
    })
    .then(() => {
      console.log(newBook.value)
      writerName.value = BookService.getWriter(newBook.value.writerId)
      catergoryName.value = BookService.getCategory(newBook.value.categoryId)
      console.log(catergoryName.value)
    })
    .catch((error) => console.log(error))
})

// getWriterAndCategory()
// console.log(newBook.title)

//router.push('/') // Redirection vers la page d'accueil
/*
const newBook = ref({
  title: book.value.title,
  number_of_pages: book.value.number_of_pages,
  excerpt: book.value.excerpt,
  summary: book.value.summary,
  publisher: book.value.publisher,
  year_of_publication: book.value.year_of_publication,
  book_cover: book.value.book_cover,
  category_name: book.value.category_name
})*/

function handleFileUpload(event) {
  newBook.value.book_cover = event.target.files[0]
}

async function getWriterAndCategory() {
  writerName = await BookService.getWriter(newBook.writerId)
  catergoryName = await BookService.getCategory(newBook.categoryId)
}
async function editBook() {
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

      // Obtener el userId desde el token
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

      console.log(route.params.id)
      console.log(BookId + 'bookId')
      const response = await BookService.editBook(route.params.id, formData)
      console.log('editBook response:', response.data)
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
        'Erreur lors du update du livre:',
        error.response ? error.response.data : error.message
      )
    }
  } else {
    alert('Veuillez remplir tous les champs.')
  }
}
</script>

<style scoped>
.edit {
  margin: auto;
  width: 30%;
}
form {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
