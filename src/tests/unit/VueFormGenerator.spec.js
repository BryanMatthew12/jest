import { shallowMount } from '@vue/test-utils';
import VueFormGenerator from '@/components/VueFormGenerator.vue';
import FormField from '@/components/FormField.vue'; // Import FormField
import axios from 'axios';

// Mock axios globally
jest.mock('axios');

describe('VueFormGenerator.vue', () => {
    let wrapper;

    beforeEach(() => {
        // Setup: shallow mount VueFormGenerator, mocking the FormField component
        wrapper = shallowMount(VueFormGenerator, {
            stubs: {
                FormField // Mock FormField for shallowMount
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear any previous mocks after each test
    });

    it('renders form fields correctly', () => {
        // Ensure FormField components exist
        expect(wrapper.findComponent({ name: 'FormField' }).exists()).toBe(true);

        const formFields = wrapper.findAllComponents(FormField);
        expect(formFields).toHaveLength(6); // Assuming 6 form fields

        // Optionally, check that the correct props are passed to each FormField
        const expectedLabels = ['Name', 'Email', 'Username', 'Password', 'Favorite Language', 'Accept Terms'];
        formFields.wrappers.forEach((field, index) => {
            expect(field.props().label).toBe(expectedLabels[index]);
        });
    });

    it('updates model when input fields change', async () => {
        const formFields = wrapper.findAllComponents(FormField);

        // Simulate input field changes
        const formValues = ['John Doe', 'john.doe@example.com', 'johndoe', 'password123', 'Javascript', true];
        formFields.wrappers.forEach(async (field, index) => {
            await field.vm.$emit('input', formValues[index]);
        });

        // Ensure model is updated
        expect(wrapper.vm.model).toEqual({
            name: 'John Doe',
            email: 'john.doe@example.com',
            username: 'johndoe',
            password: 'password123',
            favoriteLanguage: 'Javascript',
            acceptTerms: true
        });
    });

    it('calls handleSubmit when form is submitted', async () => {
        const mockPost = jest.fn().mockResolvedValue({ data: { success: true } });
        axios.post.mockImplementation(mockPost);

        const formFields = wrapper.findAllComponents(FormField);
        const formValues = ['John Doe', 'john.doe@example.com', 'johndoe', 'password123', 'Javascript', true];

        // Set up form data
        formFields.wrappers.forEach(async (field, index) => {
            await field.vm.$emit('input', formValues[index]);
        });

        // Trigger form submission
        await wrapper.find('form').trigger('submit.prevent');

        // Expect POST request with correct data
        expect(mockPost).toHaveBeenCalledWith('http://localhost:3000/users', {
            name: 'John Doe',
            email: 'john.doe@example.com',
            username: 'johndoe',
            id: expect.any(String),
            password: 'password123',
            favoriteLanguage: 'Javascript',
            acceptTerms: true
        });
    });

    it('checks password length validation', async () => {
        const formFields = wrapper.findAllComponents(FormField);
    
        // Set the values for the other fields via FormField
        await formFields.at(0).vm.$emit('input', 'John Doe'); // Name
        await formFields.at(1).vm.$emit('input', 'john.doe@example.com'); // Email
        await formFields.at(2).vm.$emit('input', 'johndoe'); // Username
        await formFields.at(4).vm.$emit('input', 'Javascript'); // Favorite Language
        await formFields.at(5).vm.$emit('input', true); // Accept Terms (checkbox)
    
        // Set an invalid password
        await formFields.at(3).vm.$emit('input', 'short'); // Password
    
        // Try submitting the form
        await wrapper.find('form').trigger('submit.prevent');
    
        // Verify that the error message is displayed
        expect(wrapper.vm.errorMessage).toBe('Password must be at least 6 characters long.');
    
        // Set a valid password
        await formFields.at(3).vm.$emit('input', 'validPass123'); // Valid password
    
        // Clear the error message and submit again
        wrapper.vm.errorMessage = '';
        await wrapper.find('form').trigger('submit.prevent');
    
        // Verify that the error message is cleared and submission is processed
        expect(wrapper.vm.errorMessage).toBe('');
    });
    
});
