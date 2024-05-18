import axios from 'axios' // importation d'axios

// importantion des données depuis l'API
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxNDk4OTIwOSwiZXhwIjoxNzQ2NTQ2ODA5fQ.eYFtHHTRSRB8cKHgPdcKRKnwDdLlhNBIGm_VV6D3jp4'
const apiClient = axios.create({
  baseURL: 'http://localhost:3901/api',
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
  getCategorie(id) {
    return apiClient.get('/categories/' + id)
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
