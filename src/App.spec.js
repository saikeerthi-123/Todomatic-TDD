import Enzyme from 'enzyme';
import React from "react";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from "./App";
import {shallow, mount} from 'enzyme';
import {fireEvent, render} from "@testing-library/react";
import '@testing-library/jest-dom'

Enzyme.configure({adapter: new Adapter()});

describe("Functionalities of todo app", () => {
    it("Should show three tasks remaining initially", () => {
        const DATA = [
            {id: "todo-0", name: "Eat", completed: true},
            {id: "todo-1", name: "Sleep", completed: false},
            {id: "todo-2", name: "Repeat", completed: false}
        ];
        const task = render(<App tasks={DATA}/>);
        expect(task.getByTestId("list-heading")).toHaveTextContent('3 tasks remaining');

    });

    it("Should add the task if user enter the input", () => {
        const DATA = [
            {id: "todo-0", name: "Eat", completed: true},
            {id: "todo-1", name: "Sleep", completed: false},
            {id: "todo-2", name: "Repeat", completed: false}
        ];
        const wrapper = mount(<App tasks={DATA}/>);
        // expect(wrapper.find('Form').length).toBe(1);
        let target = {
            target: {
                value: "task1"
            }
        };
        wrapper.find('.add-task-input').simulate('change', target);
        expect(wrapper.find('.addButton').length).toBe(1);
        wrapper.find('.addButton').simulate('submit');
        console.log((wrapper.find('Todo')));
        expect(wrapper.find('Todo').length).toBe(4);
        expect(wrapper.find('Todo').at(3).props().name).toBe('task1');
    });

    it("Should delete the task if user presses the delete button", () => {
        const DATA = [
            {id: "todo-0", name: "Eat", completed: true},
            {id: "todo-1", name: "Sleep", completed: false},
            {id: "todo-2", name: "Repeat", completed: false}
        ];
        const wrapper = mount(<App tasks={DATA}/>);
        // expect(wrapper.find('Form').length).toBe(1);
        const task = wrapper.find('Todo').at(2);
        task.find('.delete_button').simulate('click');
        expect(wrapper.find('Todo').length).toBe(2);
    });

    it('should edit the already existing task if edit button is clicked', function () {
        const DATA = [
            {id: "todo-0", name: "Eat", completed: true},
            {id: "todo-1", name: "Sleep", completed: false},
            {id: "todo-2", name: "Repeat", completed: false}
        ];
        const wrapper = mount(<App tasks={DATA}/>);
        const task = wrapper.find('Todo').at(0);
        expect(wrapper.find('Todo').at(0).length).toBe(1);
        //console.log(task.props().name);
        task.find('.edit_button').simulate('click');
        let event = {target : {value :  "Drink"}};
        wrapper.find('.edit_text').simulate('change',event);
        wrapper.find('.save-button').simulate('submit');
        expect(wrapper.find('Todo').at(0).props().name).toBe('Drink');

    });

    it('should cancel the edit if the user presses the cancel button', function () {
        const DATA = [
            {id: "todo-0", name: "Eat", completed: true},
            {id: "todo-1", name: "Sleep", completed: false},
            {id: "todo-2", name: "Repeat", completed: false}
        ];
        let event = {target : {value :  "Drink"}};
        const wrapper = mount(<App tasks={DATA}/>);
        const task = wrapper.find('Todo').at(1);
        expect(wrapper.find('Todo').at(1).length).toBe(1);
        task.find('.edit_button').simulate('click');
        wrapper.find('.edit_text').simulate('change',event);
        wrapper.find('.todo-cancel').simulate('click');
        expect(wrapper.find('Todo').at(1).props().name).toBe('Sleep');
    });

    it('should display remaining tasks number if the user deletes the task', () => {
        const DATA = [
            {id: "todo-0", name: "Eat", completed: true},
            {id: "todo-1", name: "Sleep", completed: false},
            {id: "todo-2", name: "Repeat", completed: false}
        ];
        const wrapper = mount(<App tasks={DATA}/>);
        const task = wrapper.find('Todo').at(1);
        task.find('.delete_button').simulate('click');
        expect(wrapper.find('Todo').length).toBe(2);
        expect(wrapper.find('.list_heading').text().includes('2 tasks remaining')).toBe(true);
    });

    it('should show the active tasks if active button is pressed', () => {
        const DATA = [
            {id: "todo-0", name: "Eat", completed: true},
            {id: "todo-1", name: "Sleep", completed: false},
            {id: "todo-2", name: "Repeat", completed: false}
        ];
        const wrapper = mount(<App tasks={DATA}/>);
        const selecttask = wrapper.find('Todo').at(1);
        expect(wrapper.find('Todo').at(1).length).toBe(1);
        selecttask.find('.click_checkbox').simulate('change',"todo-1"); // change sleep to completed
        const task = wrapper.find('FilterButton').at(1);
        expect(task.find('.show_tasks').text().includes('Active')).toBe(true);
        task.find('.show_tasks').simulate('click');
        expect(wrapper.find('.list_heading').text().includes('1 task remaining')).toBe(true);
    });

    it('should show the completed tasks if completed button is pressed', () => {
        const DATA = [
            {id: "todo-0", name: "Eat", completed: true},
            {id: "todo-1", name: "Sleep", completed: false},
            {id: "todo-2", name: "Repeat", completed: false}
        ];
        const wrapper = mount(<App tasks={DATA}/>);
        const selecttask = wrapper.find('Todo').at(1);
        expect(wrapper.find('Todo').at(1).length).toBe(1);
        selecttask.find('.click_checkbox').simulate('change',"todo-1"); // change sleep to completed
        const task = wrapper.find('FilterButton').at(2);
        expect(task.find('.show_tasks').text().includes('Completed')).toBe(true);
        task.find('.show_tasks').simulate('click');
        expect(wrapper.find('.list_heading').text().includes('2 tasks remaining')).toBe(true);
    });

    it('should show all the tasks if all button is pressed', () => {
        const DATA = [
            {id: "todo-0", name: "Eat", completed: true},
            {id: "todo-1", name: "Sleep", completed: false},
            {id: "todo-2", name: "Repeat", completed: false}
        ];
        const wrapper = mount(<App tasks={DATA}/>);
        const selecttask = wrapper.find('Todo').at(1);
        expect(wrapper.find('Todo').at(1).length).toBe(1);
        selecttask.find('.click_checkbox').simulate('change',"todo-1"); // change sleep to completed
        const task = wrapper.find('FilterButton').at(0);
        expect(task.find('.show_tasks').text().includes('All')).toBe(true);
        task.find('.show_tasks').simulate('click');
        expect(wrapper.find('.list_heading').text().includes('3 tasks remaining')).toBe(true);
    });

});
