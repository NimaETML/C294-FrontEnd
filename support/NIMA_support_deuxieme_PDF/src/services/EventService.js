import axios from 'axios' // importation d'axios

// importantion des données depuis un serveur en ligne (mock database)
const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  // get tous les events
  getEvents() {
    return apiClient.get('events')
  },
  // get un seul event
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
}
