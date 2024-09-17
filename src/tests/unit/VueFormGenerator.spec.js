import { mount } from '@vue/test-utils';
import VueFormGenerator from '@/components/VueFormGenerator.vue';
import axios from 'axios';

// Mock axios globally
jest.mock('axios');

describe('VueFormGenerator.vue', () => {
    let wrapper;

    beforeEach(() => {
        // Reset the wrapper before each test
        wrapper = mount(VueFormGenerator);
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear any previous mocks after each test
    });

    it('renders form fields correctly', () => {
        expect(wrapper.find('input#name').exists()).toBe(true);
        expect(wrapper.find('input#email').exists()).toBe(true);
        expect(wrapper.find('input#username').exists()).toBe(true);
        expect(wrapper.find('input#password').exists()).toBe(true);
        expect(wrapper.find('select#favoriteLanguage').exists()).toBe(true);
        expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true);
    });

    it('updates model when input fields change', async () => {
        await wrapper.find('input#name').setValue('John Doe');
        await wrapper.find('input#email').setValue('john.doe@example.com');
        await wrapper.find('input#username').setValue('johndoe');
        await wrapper.find('input#password').setValue('password123');
        await wrapper.find('select#favoriteLanguage').setValue('Javascript');
        await wrapper.find('input[type="checkbox"]').setChecked(true);

        expect(wrapper.vm.model.name).toBe('John Doe');
        expect(wrapper.vm.model.email).toBe('john.doe@example.com');
        expect(wrapper.vm.model.username).toBe('johndoe');
        expect(wrapper.vm.model.password).toBe('password123');
        expect(wrapper.vm.model.favoriteLanguage).toBe('Javascript');
        expect(wrapper.vm.model.acceptTerms).toBe(true);
    });

    it('calls handleSubmit when form is submitted', async () => {
        // Mock the POST request
        const mockPost = jest.fn().mockResolvedValue({ data: { success: true } });
        axios.post.mockImplementation(mockPost);

        // Set up form data
        await wrapper.find('input#name').setValue('John Doe');
        await wrapper.find('input#email').setValue('john.doe@example.com');
        await wrapper.find('input#username').setValue('johndoe');
        await wrapper.find('input#password').setValue('password123');
        await wrapper.find('select#favoriteLanguage').setValue('Javascript');
        await wrapper.find('input[type="checkbox"]').setChecked(true);

        // Trigger form submission
        await wrapper.find('form').trigger('submit.prevent');

        // Expect the POST request to be called with the correct data
        expect(mockPost).toHaveBeenCalledWith('http://localhost:3000/users', {
            name: 'John Doe',
            email: 'john.doe@example.com',
            username: 'johndoe',
            password: 'password123',
            favoriteLanguage: 'Javascript',
            acceptTerms: true
        });
    });

    it('fetches user data on mount (GET request)', async () => {
        // Mock the GET request
        const mockGet = jest.fn().mockResolvedValue({
            data: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                username: 'johndoe',
                password: 'password123',
                favoriteLanguage: 'Javascript',
                acceptTerms: true
            }
        });
        axios.get.mockImplementation(mockGet);

        // Mount the component again with the mocked GET
        wrapper = mount(VueFormGenerator);

        // Wait for the GET request to resolve
        await wrapper.vm.$nextTick();

        console.log('model after fetchuser', wrapper.vm.model);
        
        // Expect the GET request to be called with the correct URL
        expect(mockGet).toHaveBeenCalledWith('http://localhost:3000/users/1');

        // Check that the form fields are populated with the fetched data
        expect(wrapper.vm.model.name).toBe('John Doe');
        expect(wrapper.vm.model.email).toBe('john.doe@example.com');
        expect(wrapper.vm.model.username).toBe('johndoe');
        expect(wrapper.vm.model.password).toBe('password123');
        expect(wrapper.vm.model.favoriteLanguage).toBe('Javascript');
        expect(wrapper.vm.model.acceptTerms).toBe(true);
    });
});
