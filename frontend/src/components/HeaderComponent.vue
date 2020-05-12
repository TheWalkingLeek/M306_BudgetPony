<template>
  <header>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand href="#">Budgetpony M306</b-navbar-brand>
      <b-navbar-toggle target="header-navbar-toggle"></b-navbar-toggle>
      <b-collapse id="header-navbar-toggle" is-nav>
        <b-navbar-nav>
          <b-nav-item
            v-for="link in links"
            :key="link.name"
            :to="{ name: link.name }"
          >
            {{ link.title }}
            <span v-if="link.name === $route.name" class="sr-only"
              >(current)</span
            >
          </b-nav-item>
          <b-button
            v-b-modal.new-transaction-modal
            variant="primary"
            v-if="this.$store.state.loggedIn"
            >Erfassen</b-button
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  data: () => {
    return {};
  },
  computed: {
    links() {
      if (!this.$store.state.loggedIn) {
        return [
          { name: "login", title: "Login" },
          { name: "register", title: "Register" }
        ];
      }
      return [
        { name: "home", title: "Home" },
        { name: "collect", title: "Collect" },
        { name: "categories", title: "Categories" },
        { name: "planning", title: "Planning" },
        { name: "logout", title: "Logout" }
      ];
    }
  }
};
</script>

<style lang="scss" scoped></style>
