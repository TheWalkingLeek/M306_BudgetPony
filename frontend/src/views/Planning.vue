<template>
  <div class="route-container">
    <h1>BudgetPony</h1>
    <b-container class="mt-3">
      <b-row>
        <b-col cols="8">
          <b-container fluid>
            <b-row
              class="my-1"
              v-for="category in categories"
              :key="category.id"
            >
              <b-col sm="3">
                <label :for="`category-${category}`" class="float-left"
                  >{{ category.name }}:</label
                >
              </b-col>
              <b-col sm="9">
                <b-form-input
                  :id="`category-${category}`"
                  class="text-right"
                  type="number"
                  step="1"
                  min="0"
                  v-model.number="category.budget"
                ></b-form-input>
              </b-col>
            </b-row>
          </b-container>
          <div id="stroke"></div>
          <div>
            <label class="float-left ml-3 mt-2">Einkommen:</label>
            <label class="float-right mr-3 mt-2"
              >{{ categories.reduce((b, n) => b + n.budget, 0) }} CHF</label
            >
          </div>
        </b-col>
      </b-row>
      <b-container>
        <b-row>
          <b-button
            v-on:click="updatePlanning()"
            variant="primary"
            class="m-1 ml-auto"
            >Speichern</b-button
          >
          <b-button variant="secondary" class="m-1">Abbrechen</b-button>
        </b-row>
      </b-container>
      <div v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Planning",
  data() {
    this.refreshCategories();
    return {
      errors: [],
      categories: []
    };
  },

  methods: {
    refreshCategories() {
      fetch("/api/category/")
        .then(response => response.json())
        .then(response => {
          this.categories = response.category;
        });
    },
    updatePlanning() {
      this.errors = [];
      this.categories.forEach(category => {
        if (category.budget < 0) {
          this.errors.push("Budget can not be less than 0");
          return;
        }
      });

      if (this.errors.length === 0) {
        fetch("/api/categories", {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.categories)
        }).then(() => this.refreshCategories());
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#stroke {
  height: 2px;
  display: block;
  background-color: dimgray;
  margin-top: 10px;
}
</style>
