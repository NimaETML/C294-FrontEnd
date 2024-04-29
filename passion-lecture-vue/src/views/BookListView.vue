<script setup>
import { ref, onMounted } from 'vue'
import BookCard from '@/components/BookCard.vue'
import BookService from '../services/BookService'

// mis en reactive (ref), reload la vue à chaque changement de l'element
const books = ref(null)

onMounted(() => {
  // récupère les "events" du mock à la création du componenet
  BookService.getBooks() // récupère le mock data.
    .then((response) => {
      // SI OLD CODE ALORS .then nécessaire pour la promesse, car axios est asynchrone, il faut lui préciser qu'il doit attendre d'avoir fini le get avant de faire ce code. La syntaxe async /await est aussi possible.
      books.value = response.data
    })
    .catch((error) => {
      // affiche les erreur en cosole.log en  cas d'erreurs
      console.log(error)
    })
})
</script>

<!-- Affichage du titre et des EventCards -->
<template>
  <h1>List des livres</h1>
  <div class="books">
    <!-- :key nécessaire pour améliorer les pérformances -->
    <BookCard v-for="book in books" :key="book.id" :book="book" />
  </div>
</template>

<style scoped>
.books {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
