<template>
    <div data-cy="taskListContainer">    
      <div v-bind:key="task.id" v-for="task in allTasks">
        <TaskList v-bind:task="task" />
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  import TaskList from './TaskList.vue';
  
  export default {
    components: {
      TaskList
    },
    name: 'TaskManager',
    props: ["task"],
    methods: {
      ...mapActions(['fetchTasks'])
    },
    computed: mapGetters(['allTasks']),
    created() {
      this.fetchTasks()
    }
  }
  </script>
  
  <style scoped>
  </style>
  