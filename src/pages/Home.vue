<template>
    <div id="app">
      <AddTask/>
      <TaskManager/>
      <vue-form-generator/>
    </div>
  </template>
  
  <script>
  import AddTask from '@/components/AddTask.vue';
  import TaskManager from '@/components/TaskManager.vue';
  import VueFormGenerator from '@/components/VueFormGenerator.vue';
  
  export default {
    name: 'Home',
    components: {
      TaskManager,
      VueFormGenerator,
      AddTask,
      
    },
  }
  </script>
  
  <style>
  /* Add your styles here */
  </style>
  