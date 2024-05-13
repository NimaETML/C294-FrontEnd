<script setup>
import { ref } from 'vue'

defineProps({
  book: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <!-- route avec un paramètre -->

  <div class="book-card">
    <h2>{{ book.title }}</h2>
    <p>Edit in {{ book.editionYear }}</p>
    <span> Date: {{ book.created }}</span>
  </div>
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
