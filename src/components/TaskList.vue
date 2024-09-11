<template>
    <div class="task-item" 
    v-bind:class="{'is-complete':task.completed}">
    <input type="checkbox" class="cb" @click="markComplete">
        {{ task.name }}
    <button @click="deleteTask">Delete Task</button>
    </div>
</template>



<script>

import {mapActions} from 'vuex';
export default {
    name: "TaskList",
    props: ["task"],
    mounted(){
        console.log(this.task);
    },
    methods: {
      ...mapActions(['removeTask','updatedTask']),
        markComplete(){
          const updatedTask = {
            id : this.task.id,
            name: this.task.name,
            completed: !this.task.completed
          };
          this.updatedTask(updatedTask)
        },
        deleteTask() {
          this.removeTask(this.task)
        }
    }
}

</script>



<style scoped>
  .task-item {
    background: #f4f4f4;
    padding: 10px;
    border-bottom: 1px #ccc dotted;
  }
  /* .cb {
    text-decoration: none;
  } */
  .is-complete {
    text-decoration: line-through;
    text-decoration-color: red;
  }
</style>
