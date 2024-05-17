<script setup>
import { ref } from 'vue'

defineProps({
  categoryId: {
    type: Number,
    required: true
  }
})
</script>

<template>
    <div class="category-list">
      <h2>{{ book.title }}</h2>
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
.book-link {
  color: #39495c;
  text-decoration: none;
}
</style>
