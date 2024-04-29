import axios from 'axios' // importation d'axios

// importantion des données depuis un serveur en ligne (mock database)
const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  // get tous les events
  getBooks() {
    return apiClient.get('books')
  },
  // get un seul event
  getBook(id) {
    return apiClient.get('/books/' + id)
  }
}
