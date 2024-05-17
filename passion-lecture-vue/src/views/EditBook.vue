<template>
  <h1>Editing the book..</h1>
</template>
=======
onMounted(() => {
  BookService.getBook(route.params.id)
    .then((response) => {
      book.value = response.data.data
    })
    .catch((error) => console.log(error))
})