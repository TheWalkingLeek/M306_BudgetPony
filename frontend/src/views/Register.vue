<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <label>
        Email Address
        <input type="email" placeholder="email@example.com">
      </label>
      <label>
        Password
        <input type="password" placeholder="Password">
      </label>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>

</style>
