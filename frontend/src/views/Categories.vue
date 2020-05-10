<template>
  <div class="categories">
    <div class="">
      <div class="row">
        <div class="col-sm-2">
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
                <div id="newCategoryForm" v-if="this.newCategory">
                  <input v-model="newCategory.name" placeholder="Neue Kategorie" size="10">
                  <button class="btn btn-primary" v-on:click="submitNewCategory()">Speichern</button>
                  <button class="btn btn-secondary" v-on:click="abortNewCategory()">Abbrechen</button>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <button class="btn btn-light" v-if="!this.newCategory" v-on:click="createCategory()">Erfassen</button>
            </div>
          </div>
        </div>
        <div class="col-sm">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Ausgaben</h5>
              <table class="table">
                <thead>
                  <tr>
                    <td>Datum</td>
                    <td>Bezeichnung</td>
                    <td>Betrag</td>
                    <td>Option</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="transaction in transactions"
                    v-bind:key="transaction.id">
                    <td>{{ transaction.createdat }}</td>
                    <td>{{ transaction.description }}</td>
                    <td>{{ transaction.amount }}</td>
                    <td><button class="btn btn-danger" v-on:click="deleteTransaction(transaction)">delete</button></td>
                  </tr>
                </tbody>
              </table>
            <h6>Total: {{ total }}</h6>
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
    this.refreshCategories();
    return { categories: [], transactions: [], newCategory: null };
  },

  computed: {
    total: function () {
      let sum = 0
      this.transactions.forEach(t => sum += t.amount);
      return sum;
    }
  },

  methods: {
    refreshCategories() {
      fetch("/api/category")
        .then(response => response.json())
        .then(response => {
          this.categories = response.category || [];
          this.switchSelectedCategory(this.categories[0]);
        });
    },
    
    switchSelectedCategory(category) {
      fetch("/api/category/" + category?.id + "/transaction")
        .then(response => response.json())
        .then(response => {
            this.transactions = response.transaction || []
      });
    },
    
    deleteTransaction(transaction) {
      fetch("/api/transaction/" + transaction.id, { method: "DELETE" }).then(() => this.switchSelectedCategory(transaction.categoryid));
    },
    
    createCategory() {
      this.newCategory = {};
    },
    
    submitNewCategory() {
      fetch("/api/category", { method: "POST", 
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.newCategory)})
        .then(() => {
          this.refreshCategories();
          this.abortNewCategory();
        });
    },
    
    abortNewCategory() {
      this.newCategory = null;
    }
  }
};
</script>

<style scoped>
#newCategoryForm {
  margin-top: 20%;
  border: black solid 1px;
  border-radius: 5px;
  padding: 3%;
}
</style>
