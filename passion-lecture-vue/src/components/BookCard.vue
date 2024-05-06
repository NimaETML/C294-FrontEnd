<script setup>
defineProps({
  book: {
    type: Object,
    required: true
  }
})
</script>

<!-- affichage d'une EventCard -->
<template>
  <!-- route avec un paramètre -->
  <RouterLink class="book-link" :to="{ name: 'book-details', params: { id: book.id } }">
    <div class="book-card">
      <h2>{{ book.title }}</h2>
      <span>@{{ book.time }} on {{ book.date }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.book-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.book-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
