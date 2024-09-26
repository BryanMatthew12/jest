<template>
  <div id="app">
    <HeaderPage/>
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
  // data() {
  //   return {
  //     tasks: [
  //       { id: 1, name: 'Task 1', completed: false },
  //       { id: 2, name: 'Task 2', completed: false },
  //       { id: 3, name: 'Task 3', completed: false },
  //     ]
  //   };
  // }
}
</script>

<style>
/* Add your styles here */
</style>
