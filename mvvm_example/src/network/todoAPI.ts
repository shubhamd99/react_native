import {GET_TODOS, HOST_TODO} from '../constants/endpoints';

export const todoAPI = () => fetch(HOST_TODO + GET_TODOS);
