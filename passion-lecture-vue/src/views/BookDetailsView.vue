<script setup>
// Element pour details d'un event
import { ref, onMounted } from 'vue'
import BookService from '@/services/BookService.js'

// au montage (lancement de l'app)
const props = defineProps({
  id: { required: true }
})

// mis en reactive (ref), reload la vue à chaque changement de l'element
const book = ref(null)

onMounted(() => {
  // récupére l'event equivalant à l'id donnée
  BookService.getBook(props.id)
    .then((response) => {
      // donne à la variable "event" le champ "data" de cet event
      book.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
  <!-- v-if nécessaire car sinion il essay d'afficher avant d'avoir reçu event -->
  <div v-if="book">
    <h1>{{ book.title }}</h1>
    <p>{{ book.time }} on {{ book.date }} @ {{ book.location }}</p>
    <p>{{ book.description }}</p>
  </div>
</template>
