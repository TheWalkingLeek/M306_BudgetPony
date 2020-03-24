<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login" class="login-form">
      <label>
        Email Address
        <input type="email" placeholder="email@example.com">
      </label>
      <label>
        Password
        <input type="password" placeholder="Password">
      </label>
      <button type="submit">Login</button>
      <hr>
      <p>New around here? <router-link to="/Register">Register</router-link></p>
    </form>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
input {
  margin: 10px 0;
}

hr {
  width: 100%;
  border: #000000 1px solid;
}

.login-form {
  display: flex;
  flex-direction: column;
}
</style>
