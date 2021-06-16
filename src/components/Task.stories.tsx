import React from 'react';
import {Story, Meta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";

export default {
    title: 'TODOLIST/Task',
    component: Task,
} as Meta;

const removeTaskCallback = action('Remove task clicked')
const changeTaskStatusCallback = action('Change status clicked')
const changeTaskTitleCallback = action('Change title clicked')

const baseArg = {
    removeTask: removeTaskCallback,
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
}

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArg,
    task: {id: '1', title: 'HTML', isDone: true},
    todoListId: 'todoListId',
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArg,
    task: {id: '2', title: 'CSS', isDone: false},
    todoListId: 'todoListId',
};