<template>
  <div class="navbar navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">Formulario</router-link>
    <div class="d-flex">
      <router-link class="btn btn-dark" to="/" v-if="usuarioAutenticado"
        >Tareas</router-link
      >
      <router-link
        class="btn btn-dark mr-1"
        to="/registro"
        v-if="!usuarioAutenticado"
        >Registro</router-link
      >
      <router-link class="btn btn-dark" to="/login" v-if="!usuarioAutenticado"
        >Login</router-link
      >
      <button
        class="btn btn-dark"
        v-if="usuarioAutenticado"
        @click="cerrarSesion()"
      >
        Cerrar sesion
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["usuarioAutenticado"]),
  },
  methods: {
    ...mapActions(["cerrarSesion"]),
  },
};
</script>

<style>
</style>