<template>
    <div>
        <form @submit="onSubmit">
            <input type="text" v-model="title" name ="title" 
            placeholder="Add Task" class="txt" data-cy="taskInput">
            <input type="submit" value="Add Task" class="btn" data-cy="taskSubmit">
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "AddTask",
    data() {
        return {
            title: ''
        }
    },
    methods: {
        ...mapActions(['addTask']),
        onSubmit(e) {
            e.preventDefault();
            const task = {
                title: this.title,
                completed: false
            }
            this.addTask(task);
        }
    }
}
</script>

<style scoped>
  form {
    display: flex;
  }

  input[type="text"] {
    flex: 10;
    padding: 5px;
  }

  input[type="submit"] {
    flex: 2;    
  }
</style>