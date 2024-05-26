import axios from 'axios' // importation d'axios

// importation des données depuis l'API
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxNTcyMDgxMywiZXhwIjoxNzQ3Mjc4NDEzfQ.kNxNGu2qgxwhZKwDtwLQ3jX2ID12yNqJTT0deGwea54'
const apiClient = axios.create({
  baseURL: 'http://localhost:3901/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
  }
})

const uploadImage = async (imageFile) => {
  const formData = new FormData()
  formData.append('image', imageFile)

  try {
    const response = await apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    console.log('Image correctement chargée:', response.data)
    return response.data.url
  } catch (error) {
    console.error("Erreur lors du chargement de l'image:", error)
    throw error
  }
}

export { uploadImage }

export default {
  // get tous les books
  getBooks() {
    return apiClient.get('/books')
  },
  getBook(id) {
    return apiClient.get('/books/' + id)
  },
  getBookRates(id) {
    return apiClient.get(`/books/${id}/rates`)
  },
  createBook(newBook) {
    return apiClient.post('/books/', newBook, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  editBook(id, newBook) {
    return apiClient.put('/books/' + id, newBook)
  },
  deleteBook(id) {
    return apiClient.delete('/books/' + id)
  },
  getCategory(id) {
    return apiClient.get('/categories/' + id)
  },
  getCategoryByName(name) {
    return apiClient.get(`/categories/name/${name}`)
  },
  getWriter(id) {
    return apiClient.get('/authors/' + id)
  },
  getWriterByFirstname(firstname) {
    return apiClient.get(`/authors/firstname/${firstname}`)
  }
}
