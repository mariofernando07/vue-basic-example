import { createStore } from 'vuex'
import router from '../router'

const API_KEY = 'AIzaSyBc8KH0ovT6urH7KDFXOfREwqvMr1ts94w';

export default createStore({
  state: {
    tareas: [],
    tarea: {
      nombre: "",
      categorias: [],
      estado: "",
      numero: 0,
    },
    user: null,
    error: {
      type: null, message: null
    }
  },
  mutations: {
    setError(state, payload) {
      if (!payload) {
        return state.error = {
          type: null,
          message: null
        }
      }

      if (payload === 'EMAIL_NOT_FOUND') {
        return state.error = {
          type: 'email',
          message: 'Email no registrado'
        }
      }

      if (payload === 'INVALID_PASSWORD') {
        return state.error = {
          type: 'password',
          message: 'contraseña incorrecta'
        }
      }
      if (payload === 'EMAIL_EXISTS') {
        return state.error = {
          type: 'email',
          message: 'Usuario ya existente'
        }
      }

      if (payload === 'INVALID_EMAIL') {
        return state.error = {
          type: 'email',
          message: 'Email no valido'
        }
      }
    },
    setUser(state, payload) {
      state.user = payload
    },
    set(state, payload) {
      state.tareas = [
        ...state.tareas,
        payload
      ]
    },
    update(state, payload) {
      const index = state.tareas.findIndex((tarea) => tarea.id === payload.id);
      if (index !== -1) {
        state.tareas = [...state.tareas.slice(0, index), payload, ...state.tareas.slice(index + 1)];
      }
    },
    get(state, payload) {
      state.tarea = state.tareas.find(tarea => tarea.id === payload)
    },
    delete(state, payload) {
      state.tareas = state.tareas.filter(tarea => tarea.id !== payload)
    },
    cargar(state, payload) {
      state.tareas = payload
    }
  },
  actions: {
    async registrarUsuario({ commit }, user) {
      try {
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
          method: 'POST',
          body: JSON.stringify({
            ...user,
            returnSecureToken: true
          })
        })
        const userDB = await res.json()
        if (userDB.error) {
          console.log(userDB.error)
          return commit('setError', userDB.error.message)
        }
        commit('setUser', userDB)
        commit('setError', null)
        router.push('/')
      } catch (error) {
        console.log(error)
      }
    },

    async ingresarUsuario({ commit }, user) {
      try {
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
          method: 'POST',
          body: JSON.stringify({
            ...user,
            returnSecureToken: true
          })
        })
        const userDB = await res.json()
        if (userDB.error) {
          console.log(userDB.error)
          return commit('setError', userDB.error.message)
        }
        commit('setUser', userDB)
        commit('setError', null)
        localStorage.setItem('user', JSON.stringify(userDB))
        router.push('/')
      } catch (error) {
        console.log(error)
      }
    },

    cerrarSesion({ commit }) {
      commit('setUser', null)
      router.push('/login')
      localStorage.removeItem('user')
    },

    async setTarea({ commit, state }, tarea) {

      try {
        const res = await fetch(`https://form-test-api-default-rtdb.firebaseio.com/tareas/${state.user?.localId}/${tarea.id}.json?auth=${state.user?.idToken}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarea),
        })
        const dataDB = await res.json()
        commit('set', dataDB)
      } catch (error) {
        console.log(error)
      }
    },
    getTarea({ commit }, idTarea) {
      commit('get', idTarea)
    },
    async deleteTarea({ commit, state }, idTarea) {
      try {
        await fetch(`https://form-test-api-default-rtdb.firebaseio.com/tareas/${state.user?.localId}/${idTarea}.json?auth=${state.user?.idToken}`, {
          method: 'DELETE',
        })
        commit('delete', idTarea)
      } catch (error) {
        console.log(error)
      }
    },
    async updateTarea({ commit, state }, tarea) {
      try {
        const res = await fetch(`https://form-test-api-default-rtdb.firebaseio.com/tareas/${state.user?.localId}/${tarea.id}.json?auth=${state.user?.idToken}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarea),
        })
        const dataDB = await res.json()
        commit('update', dataDB)
      } catch (error) {
        console.log(error)
      }
    },
    cargarLocalStorage({ commit }) {
      console.log(localStorage.getItem('user'))
      if (localStorage.getItem('user')) {
        commit('setUser', JSON.parse(localStorage.getItem('user')))
      } else {
        commit('setUser', null)
      }
    },
    async cargarTareas({ commit, state }) {
      try {
        const res = await fetch(`https://form-test-api-default-rtdb.firebaseio.com/tareas/${state.user?.localId}.json?auth=${state.user?.idToken}`)
        const dataDB = await res.json()
        if (dataDB.error) return
        const tareas = [];
        for (let tarea in dataDB) {
          tareas.push(dataDB[tarea])
        }
        commit('cargar', tareas)
      } catch (error) {
        console.log(error)
      }
    }


  },
  modules: {
  },
  getters: {
    usuarioAutenticado: state => {
      return !!state.user;
    }
  }
})
