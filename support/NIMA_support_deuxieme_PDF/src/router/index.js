import { createRouter, createWebHistory } from 'vue-router' // importation de la bibliotèque vue router
import EventListView from '../views/EventListView.vue' // composant que nous allons utiliser dans notre view, représanant une page
import EventDetailsView from '../views/EventDetailsView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', // chemin de la route
      name: 'event-list', // nom de la route
      component: EventListView, // composant à rendre sur la route, dans ce cas, le HomeView qui est importé
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      // system d'import pour optimiser, pas utilisé car notre app est petite
      //component: () => import('../views/AboutView.vue'),
    },
    {
      // id mis en paramètre
      path: '/event/:id',
      name: 'event-details',
      props: true,
      component: EventDetailsView,
    },
  ],
})

export default router
