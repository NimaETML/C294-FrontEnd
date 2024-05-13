import AccountView from '../views/AccountView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BooksView from '@/views/BooksView.vue'
import AddBook from '@/views/AddBookView.vue'
import BookDetailsView from '@/views/BookDetailsView.vue'
import DropBook from '@/views/DropBook.vue'
import EditBook from '@/views/EditBook.vue'
import LogInView from '@/views/LogInView.vue'
import SignInView from '@/views/SignInView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', // chemin de la route
      name: 'book-list', // nom de la route
      component: HomeView
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView
    },
    {
      path: '/login',
      name: 'login',
      component: LogInView
    },

    {
      path: '/account',
      name: 'account',
      component: AccountView
      // system d'import pour optimiser, pas utilisé car notre app est petite
      //component: () => import('../views/AboutView.vue'),
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
      component: BookDetailsView
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
