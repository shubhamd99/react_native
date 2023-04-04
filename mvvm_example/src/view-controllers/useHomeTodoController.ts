import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {TodoItemType} from '../types/genericTypes';
import {TodoScreenNavigationProp} from '../types/navigation';
import useTodoViewModel from '../view-models/useTodoViewModel';

const useHomeTodoController = () => {
  const navigation = useNavigation<TodoScreenNavigationProp>();
  const {todos, fetchingTodos} = useTodoViewModel();
  // const route = useRoute<TodoScreenRouteProp>();

  useEffect(() => {
    // fetchTodos();
  }, []);

  const onPressTodoItem = (todoItem: TodoItemType) => {
    navigation.navigate('UpdateTodo', {todoItem});
  };

  const onPressCreate = () => {
    navigation.navigate('NewTodo');
  };

  return {
    todos,
    fetchingTodos,
    onPressTodoItem,
    onPressCreate,
  };
};

export default useHomeTodoController;
