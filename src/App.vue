<template>
  <div id="app">
    <HeaderPage/>
    <AddTask/>
    <TaskManager/>
  </div>
</template>

<script>

import AddTask from './components/AddTask.vue';
import TaskManager from './components/TaskManager.vue';
import HeaderPage from './components/layout/HeaderPage.vue';

export default {
  name: 'App',
  components: {
    TaskManager,
    HeaderPage,
    AddTask
  } 
}
</script>

<style>

</style>
