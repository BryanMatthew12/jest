<template>
    <ul>
      <li v-for="task in completedTasks" :key="task.id">
        {{ task.name }}
      </li>
    </ul>
  </template>
  
  <script>
  export default {
    props: {
      tasks: {
        type: Array,
        required: true
      }
    },
    computed: {
      completedTasks() {
        return this.tasks.filter(task => task.completed);
      }
    }
  };
  </script>
  