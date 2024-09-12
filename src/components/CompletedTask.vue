<template>
    <div>
      <p v-if="completedTasks.length > 0">Completed Tasks:</p>
      <ul v-if="completedTasks.length > 0">
        <li v-for="task in completedTasks" :key="task.id">
          {{ task.name }}
        </li>
      </ul>
      <p v-else>No completed tasks available.</p>
    </div>
  </template>
  
  <script>
export default {
    name:"CompletedTask",
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
