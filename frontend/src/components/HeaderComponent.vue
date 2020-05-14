<template>
  <header>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand href="#">Budgetpony M306</b-navbar-brand>
      <b-navbar-toggle target="header-navbar-toggle"></b-navbar-toggle>
      <b-collapse id="header-navbar-toggle" is-nav>
        <b-navbar-nav>
          <b-nav-item
            v-for="link in links"
            :key="link.title"
            :to="link.name ? { name: link.name } : ''"
            @click="logout(link.title)"
          >
            {{ link.title }}
            <span v-if="link.name === $route.name" class="sr-only"
              >(current)</span
            >
          </b-nav-item>
          <b-button
            v-b-modal.new-transaction-modal
            variant="primary"
            v-if="this.$store.getters.loggedIn"
            >Erfassen</b-button
          >
          <b-nav-item v-if="this.$store.state.email">{{
            this.$store.state.email
          }}</b-nav-item>
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
      if (!this.$store.getters.loggedIn) {
        return [
          { name: "login", title: "Login" },
          { name: "register", title: "Registrieren" }
        ];
      }
      return [
        { name: "home", title: "Home" },
        // { name: "collect", title: "Collect" },
        { name: "categories", title: "Kategorien" },
        { name: "planning", title: "Planung" },
        { title: "Logout" }
      ];
    }
  },
  methods: {
    logout(name) {
      if (name !== "Logout") return;
      fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      this.$store.commit("logout");
      return this.$router.go("/login");
    }
  }
};
</script>

<style lang="scss" scoped></style>
