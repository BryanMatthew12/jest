import { mount } from '@vue/test-utils';
import TaskList from '../../components/TaskList.vue';
import CompletedTask from '@/components/CompletedTask.vue';
import TaskListWithFilter from '@/components/TaskListWithFilter.vue';


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

describe('Completed Task :', () => {
    const tasks = [
        { id: 1, name: 'Task 1', completed: true },
        { id: 2, name: 'Task 2', completed: false },
        { id: 3, name: 'Task 3', completed: false }
    ]

    test('Check Completed Task', () =>{
        const wrapper = mount (CompletedTask, {
            propsData: {tasks}
        });
        
        // expect(wrapper.find('p').text()).toBe('Completed Tasks:');
        expect(wrapper.text()).not.toContain('No completed tasks available');
    })
})



describe('TaskListWithFilter Component', () => {
    const tasks = [
      { id: 1, name: 'Task 1', completed: false },
      { id: 2, name: 'Task 2', completed: true },
      { id: 3, name: 'Task 3', completed: true }
    ];
  
    test('renders only completed tasks', () => {
      const wrapper = mount(TaskListWithFilter, {
        propsData: { tasks }
      });
  
      // Expect only the completed tasks to be rendered
      const listItems = wrapper.findAll('li');
      expect(listItems.length).toBe(2); // Should render only 2 completed tasks
      expect(listItems.at(0).text()).toBe('Task 2');
      expect(listItems.at(1).text()).toBe('Task 3');
    });
  
    test('renders nothing if no tasks are completed', () => {
      const incompleteTasks = tasks.map(task => ({ ...task, completed: false }));
      const wrapper = mount(TaskListWithFilter, {
        propsData: { tasks: incompleteTasks }
      });
      
      const listItems = wrapper.findAll('li');
      expect(listItems.length).toBe(0); // No tasks should be rendered
    });
  });
  