<template>
  <div class="route-container">
    <h1>Collections</h1>
    <BoxWrapperComponent class="box">
      <template v-slot:title>Title</template>
      <p>yay</p>
      <b-button variant="primary">Hello</b-button>
    </BoxWrapperComponent>
  </div>
</template>

<script>
import BoxWrapperComponent from "../components/BoxWrapperComponent";

export default {
  name: "Collect",
  components: { BoxWrapperComponent }
};
</script>

<style lang="scss" scoped>
.box {
  height: 100%;
}
</style>
