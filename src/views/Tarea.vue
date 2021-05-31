<template>
  <form  @submit.prevent="procesarFormulario">
    <Input v-if="tarea" :tarea="tarea"></Input>
  </form>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Input from "@/components/Input.vue";
import router from "@/router"
export default {
  components: { Input },
  methods: {
    ...mapActions(["getTarea", "updateTarea"]),
    procesarFormulario() {  
      this.updateTarea(this.tarea)
      router.push('/')
    }
  },
  computed: {
    ...mapState(["tarea"]),
  },
  created() {
    this.getTarea(this.$route.params.id);
  },
};
</script>

<style>
</style>