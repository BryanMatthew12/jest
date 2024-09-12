<template>
    <div>
        <form v-on:submit="onSubmit">
            <input type="text" v-model="title" title="name"  required placeholder="Add Task">
            <input type="submit" value="Add Task" class="btn">
        </form>
    </div>
</template>

<script>

import { mapActions } from 'vuex'
import {v4 as uuidv4 } from 'uuid';

export default {
    name: "AddTask",
    data() {
        return {
            title: ''
        }
    },
    methods: {
        ...mapActions(['addTask']),
        onSubmit(e){
            e.preventDefault();
            const task = {
                id: uuidv4(),
                title: this.title,
                completed: false
            }
            this.addTask(task)
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
    display: flexbox;    
  }
</style>
