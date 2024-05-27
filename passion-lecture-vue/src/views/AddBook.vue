<template>
  <main>
    <div class="add">
      <h2>Add a new book</h2>
<<<<<<< HEAD
      <form @submit.prevent="addBook">
        <label for="title">Titre :</label>
        <input id="title" v-model="newBook.title" />
        <label for="excerpt">Extrait :</label>
        <textarea id="excerpt" v-model="newBook.excerpt"></textarea>
        <label for="summary">Resume :</label>
        <textarea id="summary" v-model="newBook.summary"></textarea>
        <label for="publisher">Editeur :</label>
        <input id="publisher" v-model="newBook.publisher" />
        <label for="year_of_publication">Annee de publication :</label>
        <input id="year_of_publication" v-model="newBook.year_of_publication" />
        <label for="book_cover">Lien a la couverture :</label>
        <input id="book_cover" v-model="newBook.book_cover" />
        <label for="writerId">Auteur :</label>
        <input id="writerId" v-model="newBook.writerId" />
        <label for="categoryId">Categorie :</label>
        <select id="categoryId" v-model="newBook.categoryId" multiple>
          <option value="1">ces</option>
          <option value="2">champs</option>
          <option value="3">sont a</option>
          <option value="4">bind avec</option>
          <option value="5">la database</option>
        </select>
        <!-- bouton pour soumettre le formulaire  -->
=======
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
          v-model="newBook.year_of_publication"
          type="date"
          placeholder="Year of Publication"
          required
        />

        <input type="file" @change="handleFileUpload" required name="book_cover" />
>>>>>>> b7422f5920b785e9f0022f57c103765c2cea34f8
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
<<<<<<< HEAD
  excerpt: '',
  summary: '',
  publisher: '',
  year_of_publication: '',
  book_cover: '',
  userId: '',
  writerId: '',
  categoryId: ''
})

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

async function addBook() {
  // Verification
  if (allFieldsVerified) {
    const bookData = {
      title: newBook.value.title,
      excerpt: newBook.value.excerpt,
      summary: newBook.value.summary,
      publisher: newBook.value.publisher,
      year_of_publication: newBook.value.year_of_publication,
      book_cover: newBook.value.book_cover,
      userId: newBook.value.userId,
      writerId: newBook.value.writerId,
      categoryId: newBook.value.categoryId
    }

    ///////////////////////            PAS FINI
    const newBook = await BookService.createBook(bookData)
    try {
      newBook.value = response.data.data
    } catch (error) {
      console.log(error)
    }

    router.push('/') // Redirection vers la page d'accueil
=======
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
      console.log('Error al crear el libro:', error.response ? error.response.data : error.message)
    }
>>>>>>> b7422f5920b785e9f0022f57c103765c2cea34f8
  } else {
    alert('Veuillez remplir tous les champs.')
  }
}

// verify all fields (for now it only denies them if they are null)
async function allFieldsVerified() {
  if (
    newBook.value.title &&
    newBook.value.excerpt &&
    newBook.value.summary &&
    newBook.value.publisher &&
    newBook.value.year_of_publication &&
    newBook.value
      .book_cover /* &&                                                          FIXER ICI ICI ICI ICI ICI ICI ICI ICI ICI ICI
    newBook.value.userId &&
    newBook.value.writerId &&
    newBook.value.categoryId*/
  ) {
    return true
  } else {
    return false
  }
}
</script>

<style scoped>
.add {
  margin: 0 auto;
  padding: 20px;
  margin-top: 20px;
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
