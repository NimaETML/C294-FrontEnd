import AccountView from '../views/AccountView.vue'
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import AllBooks from '@/views/BookList.vue'
import AddBook from '@/views/AddBook.vue'
import BookDetails from '@/views/BookDetails.vue'
import EditBook from '@/views/EditBook.vue'
import DropBook from '@/views/DropBook.vue'







//import LogInView from '@/views/LogInView.vue'
//import SignInView from '@/views/SignInView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/book-list', // chemin de la route
      name: 'book-list', // nom de la route
      component: AllBooks
    },
    {

      path: '/account',
      name: 'account',
      component: AccountView
    },
    {
      path: '/addbook',
      name: 'add-book',
      component: AddBook
    },
    {
      path: '/book/:id',
      name: 'book-details',
      props: true,
      component: BookDetails

    },
    {
      path: '/book/:id',
      name: 'edit-book',
      component: EditBook
    },

    {
      path: '/book/',
      name: 'delete-book',
      component: DropBook
    }
  ]
})

export default router
