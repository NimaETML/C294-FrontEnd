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
    return response.data.url // URL de la imagen subida
  } catch (error) {
    console.error("Erreur lors du chargement de l'image:", error)
    throw error
  }
}

export { uploadImage }

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
  },
  getCategory(id) {
    return apiClient.get('/categories/' + id)
  },
  getWriter(id) {
    return apiClient.get('/authors/' + id)
  }
}
