<template>
  <div class="route-container">
    <h1>Übersicht 💲💲💲</h1>
    <b-container>
      <b-row>
        <TotalExpensesGraphComponent />
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
