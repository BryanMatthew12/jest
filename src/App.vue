<template>
  <div id="app">
    <HeaderPage v-if="showHeader"/>
    <!-- <AddTask/> -->
    <!-- <TaskManager/> -->
    <!-- <vue-form-generator/> -->
    <!-- <CompletedTask/> -->
    <router-view/>
  </div>
</template>

<script>
// import AddTask from './components/AddTask.vue';
// import TaskManager from './components/TaskManager.vue';
import HeaderPage from './components/layout/HeaderPage.vue';
// import VueFormGenerator from './components/VueFormGenerator.vue';
// import CompletedTask from './components/CompletedTask.vue';

export default {
  name: 'App',
  components: {
    // CompletedTask,
    // TaskManager,
    // VueFormGenerator,
    HeaderPage,
    // AddTask,
    
  },
  computed: {
    showHeader() {
      return this.$route.name !== 'login'
    }
  }
}
</script>

<style>
/* Add your styles here */
</style>
