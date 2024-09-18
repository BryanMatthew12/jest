<template>
    <div>
        <h2>Vue Form Generator</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="name">Name</label>
                <input
                    type="text"
                    id="name"
                    v-model="model.name"
                    required
                    placeholder="Enter your name"
                />
            </div>
            
            <div class="form-group">
                <label for="email">Email</label>
                <input
                    type="email"
                    id="email"
                    v-model="model.email"
                    required
                    placeholder="email@test.com"
                />
            </div>
            
            <div class="form-group">
                <label for="username">Username</label>
                <input
                    type="text"
                    id="username"
                    v-model="model.username"
                    required
                    placeholder="Enter your username"
                />
            </div>
            
            <div class="form-group">
                <label for="password">Password</label>
                <input
                    type="password"
                    id="password"
                    v-model="model.password"
                    required
                    placeholder="Enter your password"
                    minlength="6"
                />
                <small>Min of 6 characters</small>
            </div>
            
            <div class="form-group">
                <label for="favoriteLanguage">Favorite Language</label>
                <select
                    id="favoriteLanguage"
                    v-model="model.favoriteLanguage"
                    required
                >
                    <option value="" disabled>Select your favorite language</option>
                    <option v-for="language in languages" :key="language" :value="language">
                        {{ language }}
                    </option>
                </select>
            </div>
            
            <div class="form-group">
                <label>
                    <input
                        type="checkbox"
                        v-model="model.acceptTerms"
                        required
                    />
                    Accept Terms
                </label>
            </div>
            
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
import { v4 as uuidv4 } from 'uuid';

export default {
    data() {
        return {
            model: {
                name: '',
                email: '',
                username: '',
                password: '',
                favoriteLanguage: '',
                acceptTerms: false
            },
            languages: ['Javascript', 'VueJs', 'CSS3', 'HTML5'],
            successMessage: '', // To show success response
            errorMessage: '' // To show error response
        };
    },
    mounted() {
        this.fetchUserData(); // Fetch user data on component mount
    },
    methods: {
        async fetchUserData() {
            try {
                const response = await axios.get('http://localhost:3000/users/1');
                // Merge the fetched data with the existing model
                this.model = { ...this.model};
                console.log('fetched user data: ', response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                this.errorMessage = 'Error fetching user data';
            }
        },
        async handleSubmit() {
        const validationError = this.validateForm();
        if (validationError) {
            this.errorMessage = validationError;
            console.log(validationError);
            
            return;
        }

        // Ensure the ID is a UUID if it hasn't been set yet
        if (!this.model.id || this.model.id === 1) {  // Check if ID is 1 or missing, replace with UUID
            this.model.id = uuidv4();
        }

        try {
            const response = await axios.post('http://localhost:3000/users', this.model);
            this.successMessage = 'Form submitted successfully!';
            this.errorMessage = ''; // Clear any previous error
            console.log('Submitted data:', response.data); // Log response for debugging
        } catch (error) {
            this.successMessage = ''; // Clear any previous success message
            this.errorMessage = 'An error occurred while submitting the form.';
            console.error('Error submitting form:', error);
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
        }
    }
};
</script>

<style scoped>
.form-group {
    margin-bottom: 1em;
}
label {
    display: block;
    margin-bottom: .5em;
}
input, select {
    width: 100%;
    padding: .5em;
    box-sizing: border-box;
}
button {
    padding: .7em 1.5em;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: .3em;
    cursor: pointer;
}
button:hover {
    background-color: #0056b3;
}
small {
    display: block;
    margin-top: .5em;
    color: #6c757d;
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
