<<<<<<< HEAD
import { createRouter, createWebHistory } from 'vue-router' // importation de la bibliotèque vue router
import BookListView from '../views/BookListView.vue' // composant que nous allons utiliser dans notre view, représanant une page
import BookDetailsView from '../views/BookDetailsView.vue'
import AccountView from '../views/AccountView.vue'
=======
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BooksView from '@/views/BooksView.vue'
import AddBook from '@/views/AddBook.vue'
import BookDetails from '@/views/BookDetails.vue'
import DropBook from '@/views/DropBook.vue'
import EditBook from '@/views/DropBook.vue'
>>>>>>> dev-william

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', // chemin de la route
      name: 'book-list', // nom de la route
      component: BookListView // composant à rendre sur la route, dans ce cas, le HomeView qui est importé
    },
    {
<<<<<<< HEAD
      path: '/account',
      name: 'account',
      component: AccountView
      // system d'import pour optimiser, pas utilisé car notre app est petite
      //component: () => import('../views/AboutView.vue'),
    },
    {
      // id mis en paramètre
      path: '/book/:id',
      name: 'book-details',
      props: true,
      component: BookDetailsView
=======
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
>>>>>>> dev-william
    }
  ]
})

export default router
