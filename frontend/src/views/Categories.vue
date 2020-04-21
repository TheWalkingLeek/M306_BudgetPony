<template>
  <div class="categories">
    <div class="container">
      <div class="row">
        <div class="col-sm-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Kategorien</h5>
              <div class="btn-group-vertical" role="group">
                <button v-for="category in categories" 
                v-bind:key="category.name"
                v-on:click="switchSelectedCategory(category)"
                class="btn btn-primary">
                   {{ category.name }}
                </button>
              </div>
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
          </div>
        </div>
        <div class="col-sm">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Ausgaben</h5>
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { categories: [{ name: "Freizeit"}, { name: "Essen" }] };
  },

  methods: {
    switchSelectedCategory(category) {
       console.log(category.name);
    }
  }
};
</script>

<style scoped>
</style>
