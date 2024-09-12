<template>
  <div id="app">
    <HeaderPage/>
    <AddTask/>
    <TaskManager/>
    <!-- Add the CompletedTask component here -->
    <CompletedTask :tasks="tasks"/>
  </div>
</template>

<script>
import AddTask from './components/AddTask.vue';
import TaskManager from './components/TaskManager.vue';
import HeaderPage from './components/layout/HeaderPage.vue';
import CompletedTask from './components/CompletedTask.vue';

export default {
  name: 'App',
  components: {
    TaskManager,
    HeaderPage,
    AddTask,
    CompletedTask
  },
  data() {
    return {
      tasks: [
        { id: 1, name: 'Task 1', completed: true },
        { id: 2, name: 'Task 2', completed: false },
        { id: 3, name: 'Task 3', completed: true }
      ]
    };
  }
}
</script>

<style>
/* Add your styles here */
</style>
