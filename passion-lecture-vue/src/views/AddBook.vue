<template>
  <main>
    <div class="add">
      <h2>Add a new book</h2>
      <form @submit.prevent="addNote">
        <input v-model="newNote.title" placeholder="Titre" />
        <textarea v-model="newNote.description" placeholder="Contenu"></textarea>
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

const newNote = ref({ title: '', description: '' })

async function addNote() {
  if (newNote.value.title && newNote.value.description) {
    // Préparation de l'objet à envoyer
    const noteData = {
      title: newNote.value.title,
      description: newNote.value.description
    }
    await NoteService.createNote(noteData)
      .then((response) => {
        newNote.value = response.data.data
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
