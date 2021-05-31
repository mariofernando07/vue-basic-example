<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Categorias</th>
        <th scope="col">Estado</th>
        <th scope="col">Numero</th>
        <th scope="col">Accion</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="tarea in tareas" :key="tarea.id">
        <th scope="row">{{ tarea.id }}</th>
        <td>{{ tarea.nombre }}</td>
        <td>
          {{ tarea.categorias.join(", ") }}
        </td>
        <td>{{ tarea.estado }}</td>
        <td>{{ tarea.numero }}</td>
        <td>
          <button class="btn btn-danger mr-2" @click="deleteTarea(tarea.id)">
            Eliminar
          </button>
          <!-- <router-link class="btn btn-primary" :to="'/tarea/' + tarea.id">Editar</router-link> -->
          <router-link
            class="btn btn-warning"
            :to="{
              name: 'Tarea',
              params: {
                id: tarea.id,
              },
            }"
            >Editar</router-link
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["tareas"]),
  },
  methods: {
    ...mapActions(["deleteTarea"]),
  },
};
</script>
<style>
</style>