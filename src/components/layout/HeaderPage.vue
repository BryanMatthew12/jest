<template>
    <header class="header ">
        <h1>Task Manager</h1>
        <div id="nav">
            <router-link to="/">Login</router-link>
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
        </div>
    </header>
</template>


<script>
export default {
    name : "HeaderPage"
}


</script>


<style scoped>
.header{
    background: #333;
    color: white;
    text-align: center;
    padding: 10px;
}
.header a {
    color: white;
    padding-right: 5px;
}

</style>