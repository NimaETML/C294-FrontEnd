<script setup>
// Element pour details d'un event
import { ref, onMounted } from 'vue'
import EventService from '@/services/EventService.js'

// au montage (lancement de l'app)
const props = defineProps({
  id: { required: true },
})

// mis en reactive (ref), reload la vue à chaque changement de l'element
const event = ref(null)

onMounted(() => {
  // récupére l'event equivalant à l'id donnée
  EventService.getEvent(props.id)
    .then((response) => {
      // donne à la variable "event" le champ "data" de cet event
      event.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
  <!-- v-if nécessaire car sinion il essay d'afficher avant d'avoir reçu event -->
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>
