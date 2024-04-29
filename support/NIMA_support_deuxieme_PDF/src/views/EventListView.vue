<script setup>
import { ref, onMounted } from 'vue'
import EventCard from '@/components/EventCard.vue'
import EventService from '../services/EventService'

// mis en reactive (ref), reload la vue à chaque changement de l'element
const events = ref(null)

onMounted(() => {
  // récupère les "events" du mock à la création du componenet
  EventService.getEvents() // récupère le mock data.
    .then((response) => {
      // SI OLD CODE ALORS .then nécessaire pour la promesse, car axios est asynchrone, il faut lui préciser qu'il doit attendre d'avoir fini le get avant de faire ce code. La syntaxe async /await est aussi possible.
      events.value = response.data
    })
    .catch((error) => {
      // affiche les erreur en cosole.log en  cas d'erreurs
      console.log(error)
    })
})
</script>

<!-- Affichage du titre et des EventCards -->
<template>
  <h1>Events For Good</h1>
  <div class="events">
    <!-- :key nécessaire pour améliorer les pérformances -->
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
