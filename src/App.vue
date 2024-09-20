<template>
  <div id="app">
    <HeaderPage/>
    <AddTask/>
    <TaskManager/>
    <!-- Add the CompletedTask component here -->
    <CompletedTask :tasks="tasks"/>
    <vue-form-generator/>
  </div>
</template>

<script>
import AddTask from './components/AddTask.vue';
import TaskManager from './components/TaskManager.vue';
import HeaderPage from './components/layout/HeaderPage.vue';
import CompletedTask from './components/CompletedTask.vue';
import VueFormGenerator from './components/VueFormGenerator.vue';


export default {
  name: 'App',
  components: {
    TaskManager,
    VueFormGenerator,
    HeaderPage,
    AddTask,
    CompletedTask,
    
  },
  data() {
    return {
      tasks: [
        { id: 1, name: 'Task 1', completed: false },
        { id: 2, name: 'Task 2', completed: false },
        { id: 3, name: 'Task 3', completed: false },
      ]
    };
  }
}
</script>

<style>
/* Add your styles here */
</style>
