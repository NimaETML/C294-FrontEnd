<template>
  <main>
    <div class="edit">
      <h2>Edit a book</h2>
      <form @submit.prevent="editBook" enctype="multipart/form-data">
        <input v-model="newBook.title" placeholder="Title" />
        <input v-model="newBook.number_of_pages" type="number" placeholder="Number of Pages" />
        <input v-model="newBook.publisher" placeholder="Publisher" />
        <input
          v-model="newBook.date_of_publication"
          type="date"
          placeholder="Year of Publication"
        />
        <textarea v-model="newBook.excerpt" placeholder="Excerpt"></textarea>
        <textarea v-model="newBook.summary" placeholder="Summary"></textarea>
        <input v-model="writerName.firstName" placeholder="Writer's Firstname" />
        <input v-model="catergoryName.name" placeholder="Category Name" />
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
    type: String,
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
  BookService.getBook(route.params.id)
    .then((response) => {
      newBook.value = response.data.data
      return BookService.getWriter(newBook.value.writerId)
    })
    .then((response) => {
      writerName.value = response.data.data
      return BookService.getCategory(newBook.value.categoryId)
    })
    .then((response) => {
      catergoryName.value = response.data.data
    })
    .catch((error) => console.log(error))
})

function handleFileUpload(event) {
  newBook.value.book_cover = event.target.files[0]
}
/*
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (e) {
    console.error('Error decoding token:', e)
    return null
  }
}*/

async function editBook() {
  console.log(`GREG : ${newBook.value}`)

  console.log(newBook.value)
  console.log(newBook.value.book_cover)

  newBook.value.firstname = writerName.value.firstName
  newBook.value.category_name = catergoryName.value.name

  if (
    newBook.value.title &&
    newBook.value.number_of_pages &&
    newBook.value.publisher &&
    newBook.value.date_of_publication &&
    newBook.value.excerpt &&
    newBook.value.summary &&
    newBook.value.firstname &&
    newBook.value.category_name
  ) {
    try {
      const token = localStorage.getItem('jwt')
      if (!token) {
        alert('Token not found. Please log in again.')
        return
      }

      let decodedToken
      try {
        decodedToken = JSON.parse(atob(token.split('.')[1]))
      } catch (e) {
        console.error('Error decoding token:', e)
        alert('Invalid token. Please log in again.')
        return
      }

      const userId = decodedToken.userId
      if (!userId) {
        alert('User ID not found in token. Please log in again.')
        return
      }
      console.log('newBook.value.firstname:', newBook.value.firstname)
      const writerResponse = await BookService.getWriterByFirstname(newBook.value.firstname)
      console.log('writerResponse:', writerResponse.data.data)

      if (!writerResponse.data.data || typeof writerResponse.data.data.id === 'undefined') {
        alert("L'écrivain n'existe pas. Merci de réessayer avec un autre identifiant.")
        return
      }

      const writerId = writerResponse.data.data.id
      console.log('writerId:', writerId)

      const categoryResponse = await BookService.getCategoryByName(newBook.value.category_name)
      console.log('categoryResponse:', categoryResponse.data.data)
      if (!categoryResponse.data.data || typeof categoryResponse.data.data.id === 'undefined') {
        alert("La catégorie n'existe pas. Merci de réessayer avec un autre identifiant.")
        return
      }
      const categoryId = categoryResponse.data.data.id

      const formData = new FormData()
      formData.append('title', newBook.value.title)
      formData.append('number_of_pages', newBook.value.number_of_pages)
      formData.append('publisher', newBook.value.publisher)
      formData.append('date_of_publication', newBook.value.date_of_publication)
      formData.append('excerpt', newBook.value.excerpt)
      formData.append('summary', newBook.value.summary)
      if (newBook.value.book_cover) {
        formData.append('book_cover', newBook.value.book_cover)
      } else {
        formData.append('book_cover', '/toto/')
      }
      formData.append('userId', userId)
      formData.append('writerId', writerId)
      formData.append('categoryId', categoryId)

      console.log('AVANT editBook')
      console.log(formData)

      const response = await BookService.editBook(route.params.id, formData)
      console.log('editBook response:', response.data)

      newBook.value = {
        title: '',
        number_of_pages: '',
        publisher: '',
        date_of_publication: '',
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
