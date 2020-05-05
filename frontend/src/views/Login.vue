<template>
  <div class="login">
    <h2>Login</h2>
    <b-form @submit.prevent="login()" class="login-form">
      <b-form-group
        id="input-group-email"
        label="Email address:"
        label-for="input-email"
      >
        <b-form-input
          id="input-email"
          v-model="form.email"
          type="email"
          required
          placeholder="email@example.com"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-password"
        label="Password:"
        label-for="input-password"
      >
        <b-form-input
          id="input-password"
          v-model="form.password"
          type="password"
          required
          placeholder="Password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Login</b-button>
      <hr />
      <p>New around here? <router-link to="/register">Register</router-link></p>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: { email: "", password: "" }
    };
  },
  methods: {
    async login() {
      let response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(this.form),
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log(response);

      if (response.ok) {
        this.$bvToast.toast(`Sie haben sich erfolgreich Eingeloggt`, {
          title: "Erfolgreich Eingeloggt",
          autoHideDelay: 5000,
          appendToast: true,
          variant: "success"
        });

        return this.$router.push("/");
      } else if (response.status === 401) {
        return this.$bvToast.toast(
          `Die Email und/oder das Passwort stimmen nicht`,
          {
            title: "Login Fehlgeschlagen",
            autoHideDelay: 5000,
            appendToast: true,
            variant: "danger"
          }
        );
      }

      this.$bvToast.toast(
        `Es ist ein Fehler aufgetreten, versuchen Sie es erneut`,
        {
          title: "Login Fehlgeschlagen",
          autoHideDelay: 5000,
          appendToast: true,
          variant: "danger"
        }
      );
    }
  }
};
</script>

<style scoped>
hr {
  width: 100%;
  border: #000000 1px solid;
}
</style>
