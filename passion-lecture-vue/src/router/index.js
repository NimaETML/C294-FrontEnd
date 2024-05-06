import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BooksView from '@/views/BooksView.vue'
import AddBook from '@/views/AddBook.vue'
import BookDetails from '@/views/BookDetails.vue'
import DropBook from '@/views/DropBook.vue'
import EditBook from '@/views/DropBook.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/books',
      name: 'books',
      component: BooksView
    },
    {
      path: '/addbook',
      name: 'addbook',
      component: AddBook
    },
    {
      path: '/book/:id',
      name: '/book/bookdetails',
      component: BookDetails
    },
    {
      path: '/book/:id/edit',
      name: '/book/editbook',
      component: EditBook
    },

    {
      path: '/book/:id/delete',
      name: '/book/deletebook',
      component: DropBook
    },

    {
      path: '/about',
      name: 'about'
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    }
  ]
})

export default router
