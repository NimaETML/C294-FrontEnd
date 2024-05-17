<template>
  <main>
    <div class="add">
      <h2>Add a new book</h2>
      <form @submit.prevent="addBook">
        <input v-model="newBook.title" placeholder="Title" />
        <input v-model="newBook.ca" placeholder="Pages" />

        <textarea v-model="newBook.description" placeholder="Contenu"></textarea>
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

const newBook = ref({ title: '', description: '' })

async function addBook() {
  if (newBook.value.title && newBook.value.description) {
    // Préparation de l'objet à envoyer
    const noteData = {
      title: newBook.value.title,
      description: newBook.value.description
    }
    await NoteService.createNote(noteData)
      .then((response) => {
        newBook.value = response.data.data
      })
      .catch((error) => console.log(error))
    router.push('/') // Redirection vers la page d'accueil
  } else {
    alert('Veuillez remplir tous les champs.')
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
