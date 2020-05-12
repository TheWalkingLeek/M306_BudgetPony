<template>
  <div id="app" class="container p-0 my-0 mx-auto">
    <div class="header">
      <HeaderComponent />
    </div>
    <div class="router-view-content">
      <router-view />
      <NewTransactionComponent />
    </div>
    <div class="footer">
      <FooterComponent />
    </div>
  </div>
</template>
<script>
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import NewTransactionComponent from "./components/NewTransactionComponent";

export default {
  components: { HeaderComponent, FooterComponent, NewTransactionComponent }
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  display: flex;
  flex-direction: column;

  min-height: 100vh;
  width: 100vw;
  justify-content: stretch;

  .header,
  .footer {
    flex-shrink: 0;
    flex-grow: 0;
  }

  .router-view-content {
    flex-shrink: 0;
    flex-grow: 1;

    > * {
      height: 100%;
    }
  }
}
</style>
