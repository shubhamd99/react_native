import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import {TodoItemType} from '../types/genericTypes';
import {TodoScreenNavigationProp} from '../types/navigation';
import useTodoViewModel from '../view-models/useTodoViewModel';

const useHomeTodoController = () => {
  const navigation = useNavigation<TodoScreenNavigationProp>();
  const {todos, fetchingTodos, fetchTodos} = useTodoViewModel();
  // const route = useRoute<TodoScreenRouteProp>();

  // ComponentDidMount in Navigation
  useFocusEffect(
    useCallback(() => {
      fetchTodos();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

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
