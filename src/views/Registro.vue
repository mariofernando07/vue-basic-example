<template>
  <h1 class="my-5">Registro de usuarios</h1>
  <div class="alert alert-danger" v-if="error.type !== null">
    {{ error.message }}
  </div>
  <form @submit.prevent="procesarForm()">
    <input
      type="email"
      class="form-control"
      placeholder="email"
      v-model.trim="email"
      :class="[error.type === 'email' ? 'is-invalid' : '']"
    />
    <input
      type="password"
      class="form-control my-2"
      placeholder="password"
      v-model.trim="pass1"
    />
    <input
      type="password"
      class="form-control"
      placeholder="password"
      v-model.trim="pass2"
    />
    <button type="submit" class="btn btn-dark mt-2" :disabled="blocked">
      Registrar
    </button>
  </form>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      email: "",
      pass1: "",
      pass2: "",
    };
  },
  computed: {
    ...mapState(["error"]),
    blocked() {
      if (!this.email.includes("@")) {
        return true;
      }
      if (this.pass1.length < 6) return true;

      if (this.pass1 !== this.pass2) return true;
      return false;
    },
  },
  methods: {
    ...mapActions(["registrarUsuario"]),
    async procesarForm() {
      await this.registrarUsuario({ email: this.email, password: this.pass1 });
      if (this.error.type !== null) {
        return;
      }
      this.email = this.pass1 = this.pass2 = "";
    },
  },
};
</script>

<style>
</style>