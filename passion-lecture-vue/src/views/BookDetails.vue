<script setup>
import { ref, onMounted } from 'vue'
import BookService from '@/services/BookService'

// Définir les références réactives
const book = ref(null)
const rates = ref([])
const category = ref(null)
const author = ref(null)
const averageRating = ref(0)

// Obtenir les propriétés du composant
const props = defineProps({
  id: {
    required: true,
    type: Number
  }
})

onMounted(() => {
  BookService.getBook(props.id)
    .then((response) => {
      book.value = response.data.data

      return BookService.getCategorie(book.value.categoryId)
    })
    .then((categoryResponse) => {
      category.value = categoryResponse.data.data
    })
    .catch((error) => {
      console.log(error)
    })
})
// Fonction pour calculer la moyenne des évaluations
function calculateAverageRating(rates) {
  if (rates.length === 0) {
    return 0
  }
  const sum = rates.reduce((acc, rate) => acc + rate.rating, 0)
  return (sum / rates.length).toFixed(2)
}

// Charger les données lorsque le composant est monté

onMounted(async () => {
  try {
    // Obtenir les informations du livre
    const infoBook = await BookService.getBook(props.id)
    book.value = infoBook.data.data

    // Obtenir les évaluations du livre
    const infoRates = await BookService.getBookRates(props.id)
    rates.value = infoRates.data.data
    averageRating.value = calculateAverageRating(rates.value)

    // Obtenir les informations de la catégorie
    const infoCategory = await BookService.getCategory(book.value.categoryId)
    category.value = infoCategory.data.data

    // Obtenir les informations de l'auteur
    const infoAuthor = await BookService.getWriter(book.value.writerId)
    author.value = infoAuthor.data.data
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div class="book-card" v-if="book">
    <h2>{{ book.title }}</h2>
    <img :src="book.book_cover" alt="Couverture du livre" />
    <p>Résumé: {{ book.summary }}</p>
    <h3>Catégorie: {{ category ? category.name : 'Chargement...' }}</h3>
    <p>
      Auteur: {{ author ? author.firstName : 'Chargement...' }}
      {{ author ? author.lastName : 'Chargement...' }}
    </p>
    <p>Éditeur: {{ book.publisher }}</p>
    <p>Pages: {{ book.number_of_pages }}</p>

    <h3>Évaluations:</h3>
    <p>Moyenne des évaluations: {{ averageRating }}</p>
    <ul>
      <li v-for="rate in rates" :key="rate.id">
        Utilisateur {{ rate.userId }}: {{ rate.rating }} étoiles
      </li>
    </ul>

    <RouterLink class="button-link" :to="{ name: 'edit-book', params: { id: book.id } }"
      >Modifier ce livre</RouterLink
    >
    <RouterLink class="button-link" :to="{ name: 'delete-book', params: { id: book.id } }">
      Supprimer
    </RouterLink>
  </div>
</template>

<style scoped>
.book-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 180px;
  padding-top: 0%;
}

.button-link {
  display: inline-block;
  padding: 10px 15px;
  background-color: #333a41;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: small;
}
</style>
