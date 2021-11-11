import "./App.css";
import { useCallback,useEffect, useReducer } from "react";

const undoReducer = (state, action) => {
  switch(action.type) {
    case 'UNDO':
      if (state.past.length <= 0) {
        return state;
      }
      return {
        ...state,
        past: state.past.slice(0, state.past.length - 1),
        present: state.past[state.past.length - 1],
        future: [state.present, ...state.future]
      };
    case 'REDO':
      if(state.future.length <= 0) {
        return state;
      }
      return {
        ...state,
        past: [...state.past, state.present],
        present: state.future[0],
        future: state.future.slice(1)
      };
    case 'SET':
      return {
        past: [...state.past, state.present],
        present: action.payload.newPresent,
        future: [],
      };
    case 'RESET':
      return {
        past: [],
        present: action.payload.initialPresent,
        future: []
      };
    default:
      throw new Error('Unhandled action type: ' + action.type);
  }
};

function useUndo(initialPresent) {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  });

  const undo = useCallback(() => {
    dispatch({type: 'UNDO'});

  }, []);

  const redo = useCallback(() => {
    dispatch({type: 'REDO'});
  }, []);

  const set = useCallback((newPresent) => {
    dispatch({type: 'SET', payload: {newPresent}});
  }, []);

  const reset = useCallback(() => {
    dispatch({type: 'RESET', payload: {initialPresent}});
  }, []);

  return [
    state,
    {set, reset, undo, redo}
  ];
}

function App() {
  const [state, {set, undo, redo}] = useUndo('first');
  
  useEffect(() => {
    set('second');
    set('third');
    undo();
    redo();
  }, [set, undo, redo]);


  return <pre>{JSON.stringify(state, null, 2)}</pre>;
}

export default App;
