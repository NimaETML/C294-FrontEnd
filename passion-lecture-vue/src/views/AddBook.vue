<template>
  <main>
    <div class="add">
      <h2>Add a new book</h2>
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

<style computed>
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
