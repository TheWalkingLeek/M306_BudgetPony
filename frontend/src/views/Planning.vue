<template>
  <div class="route-container">
    <h1>BudgetPony</h1>
    <b-container class="mt-3">
      <b-row align-h="around">
        <b-col cols="8">
          <b-container fluid>
            <b-row class="my-1" v-for="category in categories" :key="category">
              <b-col sm="3">
                <label :for="`category-${category}`" class="float-left"
                  >{{ category }}:</label
                >
              </b-col>
              <b-col sm="9">
                <b-form-input
                  :id="`category-${category}`"
                  class="text-right"
                  type="number"
                  step="0.05"
                  min="0"
                ></b-form-input>
              </b-col>
            </b-row>
          </b-container>
          <div id="stroke"></div>
          <div>
            <label class="float-left ml-3 mt-2">Einkommen:</label>
            <label class="float-right mr-3 mt-2">700 CHF</label>
          </div>
        </b-col>
        <b-col cols="3">
          <b-card header="Lohntag" class="text-center">
            <b-row>
              <b-col sm="3" class="mt-1">
                <label>Tag:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  class="text-right"
                  type="number"
                  step="1"
                  min="0"
                  max="28"
                ></b-form-input>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <b-container>
        <b-row>
            <b-button variant="primary" class="m-1 ml-auto">Speichern</b-button>
            <b-button variant="secondary" class="m-1">Abbrechen</b-button>
        </b-row>
      </b-container>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Planning",
  data() {
    return {
      categories: ["Essen", "Sparen", "Transport", "Sport"]
    };
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
