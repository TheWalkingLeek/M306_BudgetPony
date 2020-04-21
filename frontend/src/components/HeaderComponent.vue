<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Budgetpony M306</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li v-for="link in links" :key="link.name" class="nav-item">
          <router-link :to="{ name: link.name }" class="nav-link">
            {{ link.title }}
            <span v-if="link.name === $route.name" class="sr-only"
              >(current)</span
            >
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "HeaderComponent",
  data: () => {
    return {
      links: [
        { name: "home", title: "Home" },
        { name: "collect", title: "Collect" },
        { name: "categories", title: "Categories" },
        { name: "planning", title: "Planning" },
        { name: "login", title: "Login" },
        { name: "register", title: "Register" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
