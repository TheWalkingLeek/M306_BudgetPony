<template>
  <div class="route-container">
    <h1>BudgetPony</h1>
    <b-container>
      <b-row>
        <b-col cols="12" md="6 p-1">
          <TotalExpensesGraphComponent />
        </b-col>
        <b-col cols="12" md="6 p-1"> </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import TotalExpensesGraphComponent from "../components/graphs/TotalExpensesGraphComponent";

export default {
  name: "Home",
  components: { TotalExpensesGraphComponent }
};
</script>

<style lang="scss" scoped></style>
