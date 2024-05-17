import axios from 'axios' // importation d'axios

// importantion des données depuis l'API
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MTQ5ODg2MTEsImV4cCI6MTc0NjU0NjIxMX0._ERtjLE57a_JXg1ICG7OmVlRZgcFemv7AH3MsGpJkzM'
const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})

export default {
  //get tous les books
  getBooks() {
    return apiClient.get('/books')
  },
  getBook(id) {
    return apiClient.get('/books/' + id)
  },
  createBook(newBook) {
    return apiClient.post('/books/', newBook)
  },
  editBook(id, newBook) {
    return apiClient.put('/books/', +id, newBook)
  },
  deleteBook(id) {
    return apiClient.delete('/books/' + id)
  }
}
