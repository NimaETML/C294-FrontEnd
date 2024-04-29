import { createRouter, createWebHistory } from 'vue-router' // importation de la bibliotèque vue router
import BookListView from '../views/BookListView.vue' // composant que nous allons utiliser dans notre view, représanant une page
import BookDetailsView from '../views/BookDetailsView.vue'
import AccountView from '../views/AccountView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', // chemin de la route
      name: 'book-list', // nom de la route
      component: BookListView // composant à rendre sur la route, dans ce cas, le HomeView qui est importé
    },
    {
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
    }
  ]
})

export default router
