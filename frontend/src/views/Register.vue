<template>
  <div class="register">
    <h2>Register</h2>
    <b-form @submit.prevent="register()" class="login-form">
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
      <b-button type="submit" variant="primary">Register</b-button>
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
    async register() {
      let response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(this.form),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const body = await response.json();
      console.log(body);
      if (response.ok) {
        this.$bvToast.toast(`Sie haben sich erfolgreich Registriert`, {
          title: "Erfolgreich Registriert",
          autoHideDelay: 5000,
          appendToast: true,
          variant: "success"
        });
        this.$store.commit("login", body.email);
        this.$router.push({name: "home"});
        return;
      } else if (body.includes("already exists.")) {
        return this.$bvToast.toast(
          `Die Angegebene Email wurde schon gebraucht`,
          {
            title: "Registration Fehlgeschlagen",
            autoHideDelay: 5000,
            appendToast: true,
            variant: "danger"
          }
        );
      }

      this.$bvToast.toast(
        `Es ist ein Fehler aufgetreten, versuchen Sie es erneut`,
        {
          title: "Registration Fehlgeschlagen",
          autoHideDelay: 5000,
          appendToast: true,
          variant: "danger"
        }
      );
    }
  }
};
</script>

<style></style>
