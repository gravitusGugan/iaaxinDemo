export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload] 
      };
    
    case 'ADD_TODO':
      const { userId, todo } = action.payload;
      const existingTodos = state.todos[userId] || []; 
      return {
        ...state,
        todos: {
          ...state.todos,
          [userId]: [...existingTodos, todo] 
        }
      };
      
    default:
      return state;
  }
};

