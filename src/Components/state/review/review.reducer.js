import { cloneDeep } from "lodash";

export const ReviewActions = {
  ADD: "ADD",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
};

export const ReviewReducer = (state, action) => {
  switch (action.type) {
    case ReviewActions.ADD: {
      return { todos: [...state.todos, action.todo] };
    }
    case ReviewActions.TOGGLE: {
      let newTodos = cloneDeep(state.todos);
      const updatedTodo = newTodos.find((x) => x.title === action.todo.title);
      updatedTodo.isComplete = !updatedTodo.isComplete;
      return {
        todos: newTodos,
      };
    }
    case ReviewActions.DELETE: {
      return {
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
      }

  
  }
};
