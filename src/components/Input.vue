<template>
  <input
    class="form-control my-2"
    type="text"
    placeholder="Ingrese nombre"
    v-model.trim="tarea.nombre"
  />
  <div class="form-check form-check-inline">
    <input
      class="form-check-input"
      type="checkbox"
      id="inlineCheckbox1"
      value="javascript"
      v-model="tarea.categorias"
    />
    <label class="form-check-label" for="inlineCheckbox1">Javascript</label>
  </div>
  <div class="form-check form-check-inline">
    <input
      class="form-check-input"
      type="checkbox"
      id="inlineCheckbox2"
      value="nodejs"
      v-model="tarea.categorias"
    />
    <label class="form-check-label" for="inlineCheckbox2">Node.js</label>
  </div>

  <div class="mt-2">
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="radio"
        name="inlineRadioOptions"
        id="inlineRadio1"
        value="urgente"
        v-model="tarea.estado"
      />
      <label class="form-check-label" for="inlineRadio1">Urgente</label>
    </div>
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="radio"
        name="inlineRadioOptions"
        id="inlineRadio2"
        value="relax"
        v-model="tarea.estado"
      />
      <label class="form-check-label" for="inlineRadio2">Relax</label>
    </div>
  </div>
  <div class="mt-2">
    <input class="form-control" type="number" v-model.number="tarea.numero" />
  </div>
  <button
    class="mt-2 btn btn-primary btn-dark btn-block"
    type="submit"
    :disabled="blocked"
  >
    Procesar
  </button>
</template>

<script>
export default {
  props: {
    tarea: Object,
  },
  computed: {
    blocked() {
      return this.tarea.nombre.trim().length <= 0;
    },
  },
};
</script>

