import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/book-list', // chemin de la route
      name: 'book-list', // nom de la route
      component: () => import('../views/BookList.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/AccountView.vue')
    },
    {
      path: '/addbook',
      name: 'add-book',
      component: () => import('../views/AddBook.vue')
    },
    {
      path: '/book/:id',
      name: 'book-details',
      props: true,
      component: () => import('../views/BookDetails.vue')
    },
    {
      path: '/book/:id',
      name: 'edit-book',
      component: () => import('../views/EditBook.vue')
    },

    {
      path: '/book/',
      name: 'delete-book',
      component: () => import('../views/DropBook.vue')
    }
  ]
})

export default router
