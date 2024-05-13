<template>
  <main>
    <form class="review-form" @submit.prevent="onSubmit">
      <!-- listen pour le submit, le ".prevent" empèche le reload de la page, qui est le comportement par défaut -->
      <h3>Leave a review</h3>
      <!-- champ de texte "imput" pour le nom du reviewer -->
      <label for="name">Name:</label>
      <input id="name" v-model="name" />
      <!-- fait le lien avec le champ "name" dans data -->
      <!-- champ de texte pour ecriture d'une "review" -->
      <label for="review">Review:</label>
      <textarea id="review" v-model="review"></textarea>
      <!-- fait le lien avec le champ "name" dans data -->
      <!-- select un "rating" parmis la liste d'options -->
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <!-- fait le lien avec le champ "rating" dans data, le ".number" précise que la valeur doit être un nombre -->
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
      <!-- select Yes ou No pour la question "Recommanderiez-vous ce produit ?" -->
      <label for="recommendation">Recommanderiez-vous ce produit ?</label>
      <select id="recommendation" v-model="recommendation">
        <!-- fait le lien avec le champ "rating" dans data, le ".number" précise que la valeur doit être un nombre -->
        <option>Yes</option>
        <option>No</option>
      </select>
      <!-- bouton pour soumettre le formulaire  -->
      <input class="button" type="submit" value="Submit" />
    </form>
  </main>
</template>

<script setup>
defineProps({
  BookId: {
    type: Number,
    required: true
  },
  UserId: {
    type: Number,
    required: true
  }
})
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BookService from '../services/BookService.js'

const route = useRoute()
const router = useRouter()
const book = ref({})

onMounted(() => {
  BookService.getBook(route.params.id)
    .then((response) => {
      book.value = response.data.data
    })
    .catch((error) => console.log(error))
})

const onSubmit = async () => {
  const newBook = {
    title: book.value.title,
    description: book.value.description
  }
  await NoteService.editNote(route.params.id, newNote)
    .then((response) => {
      note.value = response.data.data
    })
    .catch((error) => console.log(error))
  router.push('/') // Redirection vers la page d'accueil
}
</script>

<style scoped>
/*
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}*/
</style>
