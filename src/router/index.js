import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      rutaProtegida: true
    }
  },
  {
    path: '/tarea/:id',
    name: 'Tarea',
    component: () => import(/* webpackChunkName: "about" */ '../views/Tarea.vue'),
    meta: {
      rutaProtegida: true
    }
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import(/* webpackChunkName: "about" */ '../views/Registro.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.rutaProtegida && store.getters.usuarioAutenticado) {
    next();
  } else if (to.meta.rutaProtegida && !store.getters.usuarioAutenticado) {
    next('/login')
  } else {
    next()
  }
})

export default router
