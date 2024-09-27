<template>
    <div>
      <h2>Vue Form Generator</h2>
      <form id="myform" @submit.prevent="handleSubmit">
        <FormField
          v-model="model.name"
          type="text"
          id="name"
          label="Name"
          placeholder="Enter your name"
        />
        <FormField
          v-model="model.email"
          type="email"
          id="email"
          label="Email"
          placeholder="email@test.com"
        />
        <FormField
          v-model="model.username"
          type="text"
          id="username"
          label="Username"
          placeholder="Enter your username"
        />
        <FormField
          v-model="model.password"
          type="password"
          id="password"
          label="Password"
          minlength="6"
          placeholder="Enter your password"
        />
        <FormField
          v-model="model.favoriteLanguage"
          type="select"
          id="favoriteLanguage"
          :options="['Java', 'C', 'Javascript', 'C#', 'Python', 'Ruby']"
          label="Favorite Language"
          placeholder="Select your favorite language"
        />
  
        <FormField
          v-model="model.acceptTerms"
          type="checkbox"
          id="acceptTerms"
          label="Accept Terms"
        />
  
        <button type="submit">Sign Up</button>
      </form>
      
      <!-- Display Success or Error Messages -->
      <div v-if="successMessage" class="success">{{ successMessage }}</div>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  
      <h3>Values</h3>
      <pre>{{ model }}</pre>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import FormField from './FormField.vue';

  
  export default {
  components: {
    FormField,
  },
  data() {
    return {
      model: {
        name: '',
        email: '',
        username: '',
        password: '',
        favoriteLanguage: '',
        acceptTerms: false,
      },
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleSubmit() {
      const validationError = this.validateForm();
      if (validationError) {
        this.errorMessage = validationError;
        return;
      }

      try {
        // Make the POST request to the server
        const response = await axios.post('http://localhost:3000/users', {
          name: this.model.name,
          email: this.model.email,
          username: this.model.username,
          password: this.model.password,
          favoriteLanguage: this.model.favoriteLanguage,
          acceptTerms: this.model.acceptTerms,
          id: this.generateId(), // Assuming an ID is generated here
        });

        console.log('Form Submitted:', response.data);
        this.successMessage = 'Form submitted successfully!';
        this.errorMessage = '';
        this.$router.push({ name: "home" })
      } catch (error) {
        this.errorMessage = 'An error occurred while submitting the form.';
      }
    },

    validateForm() {
      if (!this.model.name) return 'Name is required.';
      if (!this.model.email) return 'Email is required.';
      if (!this.model.username) return 'Username is required.';
      if (!this.model.password) return 'Password is required.';
      if (this.model.password.length < 6) return 'Password must be at least 6 characters long.';
      if (!this.model.favoriteLanguage) return 'Favorite language is required.';
      if (!this.model.acceptTerms) return 'You must accept the terms.';
      return '';
    },

    generateId() {
      return Math.random().toString(36).substr(2, 9); // Simple ID generation
    },

    signUp(){
      this.$router.push({name: "home"});
    }

  },
};
  </script>
  
  <style scoped>
  button {
    padding: 0.7em 1.5em;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 0.3em;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  .success {
    color: green;
    margin-top: 1em;
  }
  .error {
    color: red;
    margin-top: 1em;
  }
  </style>
  