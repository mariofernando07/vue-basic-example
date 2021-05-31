<template>
  <h1 class="my-5">Login</h1>
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
      v-model.trim="pass"
      :class="[error.type === 'password' ? 'is-invalid' : '']"
    />
    <button type="submit" class="btn btn-dark mt-2" :disabled="blocked">
      Ingresar
    </button>
  </form>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      email: "",
      pass: "",
    };
  },
  computed: {
    ...mapState(["error"]),
    blocked() {
      if (!this.email.includes("@")) {
        return true;
      }
      if (this.pass?.length < 6) return true;

      return false;
    },
  },
  methods: {
    ...mapActions(["ingresarUsuario"]),
    async procesarForm() {
      await this.ingresarUsuario({ email: this.email, password: this.pass });
      if (this.error.type !== null) {
        return;
      }
      this.email = this.pass = "";
    },
  },
};
</script>

<style>
</style>