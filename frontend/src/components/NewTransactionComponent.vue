<template>
  <b-modal ref="new-transaction-modal" id="new-transaction-modal" size="lg" title="Transaktion erfassen">
    <b-container>
      <b-row>
        <b-col cols="3">Kategorie</b-col>
        <b-col>
            <b-form-select v-model="newTransaction.categoryId" class="mb-3">
              <b-form-select-option v-for="category in categories"
              v-bind:key="category.id"
              :value="category.id">{{category.name}}</b-form-select-option>
              </b-form-select>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="3">Betrag</b-col>
        <b-col>
            <input v-model="newTransaction.amount" placeholder="0.00">
        </b-col>
      </b-row>
        <b-row>
        <b-col cols="3">Beschreibung</b-col>
        <b-col>
            <input v-model="newTransaction.description" placeholder="...">
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="3">Datum</b-col>
        <b-col>
            <b-form-datepicker v-model="newTransaction.createdAt" class="mb-2"></b-form-datepicker>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="3"></b-col>
        <b-col>
            <b-form-checkbox
              v-model="isNegative">
              Ausgabe
            </b-form-checkbox>
        </b-col>
      </b-row>
    </b-container>
    <template v-slot:modal-footer>
      <button class="btn btn-primary" v-on:click="submitNewTransaction()">Speichern</button>
      <button class="btn btn-secondary" v-on:click="abortNewTransaction()">Abbrechen</button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "NewTransactionComponent",

  data() {
    this.fetchCategories();
    return { categories: [], newTransaction: {}, isNegative: false };
  },

  mounted() {
    this.$root.$on('bv::modal::show', () => {
      this.fetchCategories();
    })
  },

  methods: {
    fetchCategories() {
      fetch("/api/category")
        .then(response => response.json())
        .then(response => {
          this.categories = response.category;
        });
    },
    submitNewTransaction() {
      if(this.isNegative) this.newTransaction.amount = -this.newTransaction.amount;
      fetch(`/api/category/${this.newTransaction.categoryId}/transaction`, { method: "POST", 
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.newTransaction)}).then(this.abortNewTransaction());
    },

    abortNewTransaction() {
      this.$refs['new-transaction-modal'].hide()
      this.newTransaction = {};
    }
  }
};
</script>

<style></style>
