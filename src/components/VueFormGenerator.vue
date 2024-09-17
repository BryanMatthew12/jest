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
    mounted(){
        this.userId = 1;
        this.fetchUserData(); // Fetch user data on component mount
    },
    methods: {
        async fetchUserData() {
        try {
            const response = await axios.get(`http://localhost:3000/users/1`);
            this.model = response.data;
            console.log('fetched user data: ', response.data);
            
        } catch (error) {
            console.error('Error fetching user data:', error);
            this.errorMessage = 'Error fetching user data';
        }
        },
        async handleSubmit() {
            if (this.validateForm()) {
                try {
                    const response = await axios.post('http://localhost:3000/users', this.model);
                    this.successMessage = 'Form submitted successfully!';
                    this.errorMessage = ''; // Clear any previous error
                    console.log(response.data); // Log response for debugging
                } catch (error) {
                    this.successMessage = ''; // Clear any previous success message
                    this.errorMessage = 'An error occurred while submitting the form.';
                    console.error('Error submitting form:', error);
                }
            } else {
                this.errorMessage = 'Please fill out all required fields.';
            }
        },
        validateForm() {
            return this.model.name && this.model.email && this.model.username &&
                this.model.password && this.model.favoriteLanguage && this.model.acceptTerms;
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
``
