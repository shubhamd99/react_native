import {ERROR_TEXTS} from '../constants/Error';
import {todoAPI} from '../network/todoAPI';
import {isSuccessResponse} from '../network/utils';
import {TodoData} from '../types/stateTypes';

class TodoRepository {
  // Fetch All Todos
  public async getAllTodos({
    onComplete,
    onError,
  }: {
    onComplete: (response: TodoData[]) => void;
    onError: (response: Response | string) => void;
  }): Promise<any> {
    try {
      console.log('FETCHING TODOS....');
      const response = await todoAPI();
      const data: TodoData[] = await response.json();

      if (isSuccessResponse(response)) {
        onComplete(data);
      } else {
        onError(response);
      }
    } catch (err) {
      onError(ERROR_TEXTS.SOMETHING_WENT_WRONG);
      console.error(err);
    }
  }
}

export default new TodoRepository();
