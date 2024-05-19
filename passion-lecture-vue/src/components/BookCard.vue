<script setup>
defineProps({
  book: {
    type: Object,
    required: true
  }
})

/*
const imageUrl = ref('')

import uploadImage from '@/services/BookService'
const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (file) {
    try {
      const url = await uploadImage(file)
      imageUrl.value = url
    } catch (error) {
      console.error('Error al subir la imagen:', error)
    }
  }
}*/
</script>

<template>
  <RouterLink class="book-link" :to="{ name: 'book-details', params: { id: book.id } }">
    <div class="book-card">
      <h2>{{ book.title }}</h2>
      <img :src="book.book_cover" alt="Book Cover" />
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
