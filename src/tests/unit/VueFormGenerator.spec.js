import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueFormGenerator from '@/components/VueFormGenerator.vue'; 


const localVue = createLocalVue();

describe('VueFormGenerator.vue', () => {
  it('calls onSubmit with correct model data when form is submitted', async () => {
    const mockOnSubmit = jest.fn();

    const wrapper = shallowMount(VueFormGenerator, {
      localVue,
      data() {
        return {
          model: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            username: 'johndoe',
            password: 'password123',
            favoriteLanguage: 'VueJs',
            acceptTerms: true
          },
          schema: {
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'Name',
                model: 'name',
                required: true,
                validator: 'string'
              },
              {
                type: 'input',
                inputType: 'email',
                label: 'Email',
                model: 'email',
                required: true,
                placeholder: 'email@test.com',
                validator: 'email'
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Username',
                model: 'username',
                required: true,
                validator: 'string'
              },
              {
                type: 'input',
                inputType: 'password',
                label: 'Password',
                model: 'password',
                required: true,
                min: 6,
                hint: 'Min of 6 characters',
                validator: 'string'
              },
              {
                type: 'select',
                label: 'Favorite Language',
                model: 'favoriteLanguage',
                values: ['Javascript', 'VueJs', 'CSS3', 'HTML5']
              },
              {
                type: 'checkbox',
                default: false,
                label: 'Accept Terms',
                model: 'acceptTerms',
                required: true,
                validator: 'required'
              },
              {
                type: 'submit',
                model: 'signup',
                inputType:'submit',
                onSubmit: mockOnSubmit,
                buttonText: 'Sign Up',
                validateBeforeSubmit: true
              }
            ]
          }
        };
      }
    });

    // validate if button appear
    const submitButton = wrapper.find('.field-wrap.signup'); 
    expect(submitButton.exists()).toBe(true);

    // Simulate form submission
    await submitButton.trigger('click');

    // validate 
    expect(mockOnSubmit).toHaveBeenCalled();
    expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
      name: 'John Doe',
      email: 'john.doe@example.com',
      username: 'johndoe',
      password: 'password123',
      favoriteLanguage: 'VueJs',
      acceptTerms: true
    }));
  });
});
