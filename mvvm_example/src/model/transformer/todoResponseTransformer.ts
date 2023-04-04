import {TodoItemType} from '../../types/genericTypes';
import {TodoData} from '../../types/stateTypes';

const todoResponseTransformer = (todos: TodoData[]): TodoItemType[] => {
  const data: Array<TodoItemType> = [];

  for (const todo of todos) {
    data.push({
      id: todo.id.toString(),
      title: todo.title,
    });
  }

  return data;
};

export default todoResponseTransformer;
