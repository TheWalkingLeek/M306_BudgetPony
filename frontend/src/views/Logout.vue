<template>
<p>Logout</p>
</template>
<script>
export default {
    beforeCreate() {
        let response = await fetch("/api/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return this.$router.push("/login");
    }
}
</script>