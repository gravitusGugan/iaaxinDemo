import React, { createContext, useReducer, useEffect } from "react";

const initialState = {
  users: [
    { id: "1", name: "Gobi" },
    { id: "1", name: "Gugan" },
  ],
  todos: {
    1:[{ id: "1", text: "Home", completed: false }, { id: "2", text: "Office", completed: false }],
  
  },
  checkbox: {
    1: [{ id: "1", text: "Buy Milk", completed: false },{ id: "1", text: "Buy Eggs", completed: false }],
    2: [{ id: "2", text: "Task", completed: false },{ id: "2", text: "Meeting", completed: false }],
  },
};

// Create a context
export const GlobalContext = createContext(initialState);

// Define your reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "ADD_TODO": {
      const { userId, todo } = action.payload;
      const existingTodos = state.todos[userId] || [];
      return {
        ...state,
        todos: {
          ...state.todos,
          [userId]: [...existingTodos, todo],
        },
      };
    }
    case "ADD_CHECKBOX": {
      const { userId, checkbox } = action.payload;
      const existingCheckboxes = state.checkbox[userId] || [];
      return {
        ...state,
        checkbox: {
          ...state.checkbox,
          [userId]: [...existingCheckboxes, checkbox],
        },
      };
    }
    default:
      return state;
  }
};

// Create the provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Save state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(state));
  }, [state]);

  // Load initial state from local storage
  useEffect(() => {
    const storedState = localStorage.getItem("appState");
    if (storedState) {
      dispatch({ type: "INITIALIZE_STATE", payload: JSON.parse(storedState) });
    }
  }, []);

  const addUser = (user) => {
    dispatch({ type: "ADD_USER", payload: user });
  };

  const addTodo = (userId, todo) => {
    dispatch({ type: "ADD_TODO", payload: { userId, todo } });
  };

  const addCheckbox = (userId, checkbox) => {
    dispatch({ type: "ADD_CHECKBOX", payload: { userId, checkbox } });
  };

  return (
    <GlobalContext.Provider value={{ state, addUser, addTodo, addCheckbox }}>
      {children}
    </GlobalContext.Provider>
  );
};
