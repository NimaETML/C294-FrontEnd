<template>
  <main>
    <div class="add">
      <h2>Add a new book</h2>
      <form @submit.prevent="addBook" enctype="multipart/form-data">
        <input v-model="newBook.title" placeholder="Title" required />
        <input v-model="newBook.firstname" placeholder="Writer's Firstname" required />
        <input v-model="newBook.publisher" placeholder="Publisher" required />
        <input v-model="newBook.category_name" placeholder="Category Name" required />
        <textarea v-model="newBook.excerpt" placeholder="Excerpt" required></textarea>
        <textarea v-model="newBook.summary" placeholder="Summary" required></textarea>
        <input
          v-model="newBook.number_of_pages"
          type="number"
          placeholder="Number of Pages"
          required
        />
        <input
          v-model="newBook.date_of_publication"
          type="date"
          placeholder="Date of Publication"
          required
        />
        <input type="file" @change="handleFileUpload" name="book_cover" />
        <button type="submit">Ajouter</button>
      </form>
      <router-link to="/" class="retour-button">Retour</router-link>
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
  date_of_publication: '',
  excerpt: '',
  summary: '',
  book_cover: null,
  firstname: '',
  category_name: ''
})

function handleFileUpload(event) {
  newBook.value.book_cover = event.target.files[0]
}

//Ajout du livre
async function addBook() {
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
      const writerResponse = await BookService.getWriterByFirstname(newBook.value.firstname)

      // Vérifie si writerResponse.data et id existent
      if (!writerResponse.data.data || typeof writerResponse.data.data.id === 'undefined') {
        alert("L'écrivain n'existe pas. Merci de réessayer avec un autre identifiant.")
        return
      }

      const writerId = writerResponse.data.data.id

      // Obtention du category name
      const categoryResponse = await BookService.getCategoryByName(newBook.value.category_name)
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
      }
      formData.append('userId', userId)
      formData.append('writerId', writerId)
      formData.append('categoryId', categoryId)

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
      console.log('Erreur lors de la création du livre')
    }
  } else {
    alert('Veuillez remplir tous les champs.')
  }
}
</script>

<style scoped>
.add {
  margin: 0 auto;
  padding: 20px;
  margin-top: 70px;
  margin-bottom: 68px;
  padding-top: 0px;
  padding-bottom: 0px;
  max-width: 800px;
  background: rgb(167, 254, 255);
  background: linear-gradient(203deg, rgba(167, 254, 255, 1) 0%, rgba(110, 255, 170, 1) 100%);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  flex-direction: column;
}

.add h2 {
  font-family: 'Arial', sans-serif; /* Change this to your desired font */
  font-weight: bold;
  color: rgb(0, 86, 126);
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
}

input[type='text'],
input[type='number'],
input[type='date'],
textarea {
  width: 80%;
  max-width: 80%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  border-radius: 10px;
}

input[type='file'] {
  padding: 10px 0;
  border-radius: 10px;
}

input {
  width: 80%;
  max-width: 80%;
}

button {
  padding: 10px 15px;
  border: none;
  background: #28a745;
  color: white;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin: 10px;
  transition: background 0.3s ease;
  max-width: 200px;
  align-self: center;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
}

button:hover {
  background: rgb(0, 143, 0);
}

.retour-button {
  display: inline-block;
  margin: 15px;
  margin-top: 5px;
  padding: 10px 15px;

  background: #007bff;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-size: 16px;
  text-align: center;
  transition: background 0.3s ease;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
}

.retour-button:hover {
  background: #0063cc;
}
</style>
