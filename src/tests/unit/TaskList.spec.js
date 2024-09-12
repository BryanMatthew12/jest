import { mount } from '@vue/test-utils';
import TaskList from '../../components/TaskList.vue';

describe('Task Component unit tests : ', () => {

    test('is a Vue Instance', () => {
        const wrapper  = mount(TaskList, {
            propsData: {
                task: { 
                    name: "Task 1",
                    completed: false
                }
            }
        });
        expect(wrapper.exists()).toBe(true);
    });
});