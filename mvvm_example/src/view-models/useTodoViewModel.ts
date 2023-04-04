import {useSelector, useDispatch} from 'react-redux';
import todoResponseTransformer from '../model/transformer/todoResponseTransformer';
import TodoRepository from '../repository/todoRepository';
import {TodoAction} from '../store/todoSlice';

import {StoreType, TodoStateType} from '../types/stateTypes';

const useTodoViewModel = () => {
  const dispatch = useDispatch();
  const {
    fetchingTodos,
    todos,

    creatingTodo,
    createTodoSuccess,
    createTodoError,

    updatingTodo,
    updateTodoSuccess,
    updateTodoError,

    deletingTodo,
    deleteTodoSuccess,
    deleteTodoError,
  }: TodoStateType = useSelector((state: StoreType) => state.todo);

  const {addTodos, createTodo, updateTodo, deleteTodo, setLoading} = TodoAction;

  const setLoader = (loadingState: boolean) =>
    dispatch(setLoading(loadingState));

  const fetchTodos = async () => {
    setLoader(true); // Loading Start

    TodoRepository.getAllTodos({
      onComplete: res => {
        dispatch(addTodos(todoResponseTransformer(res).slice(0, 10)));
        setLoader(false); // Loading End
      },
      onError: () => {
        setLoader(false); // Loading End
      },
    });
  };

  return {
    fetchTodos,
    fetchingTodos,
    todos,

    createTodo: (title: string) => dispatch(createTodo({title})),
    creatingTodo,
    createTodoSuccess,
    createTodoError,

    updateTodo: (payload: {id: string; title: string}) =>
      dispatch(updateTodo(payload)),
    updatingTodo,
    updateTodoSuccess,
    updateTodoError,

    deleteTodo: (id: string) => dispatch(deleteTodo({id})),
    deletingTodo,
    deleteTodoSuccess,
    deleteTodoError,
  };
};

export default useTodoViewModel;
