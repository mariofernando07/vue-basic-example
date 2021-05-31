<template>
  <form @submit.prevent="procesarFormulario">
    <Input :tarea="tarea"></Input>
  </form>
  <hr />
  <!-- <p>{{ tarea }}</p> -->
  <ListaTareas />
</template>

<script>
// @ is an alias to /src
import Input from "@/components/Input.vue";
import ListaTareas from "@/components/ListaTareas.vue";

import { mapActions } from "vuex";
const shortid = require("shortid");

export default {
  name: "Home",
  components: {
    Input,
    ListaTareas
  },
  data() {
    return {
      tarea: {
        nombre: "",
        categorias: [],
        estado: "",
        numero: 0,
      },
    };
  },
  methods: {
    ...mapActions(["setTarea", "cargarTareas"]),
    procesarFormulario() {
      this.tarea.id = shortid.generate();
      this.setTarea(this.tarea);
      console.log(this.tarea);
      this.tarea = {
        id: "",
        nombre: "",
        categorias: [],
        estado: "",
        numero: 0,
      };
    },
  },
  created () {
    this.cargarTareas()
  },
};
</script>
