import './App.css';
import {useState, useEffect} from "react"
import { Profiler } from 'react';


// function TodoItem (props) {
//   const {id, done, text, todo, onTodoUpdate, dummyArray} = props;


//   // const todo = useSelector((state) => {
//   //     return state.shippingCenterPage.todos.find(todo => todo.id === props.id)
//   // }, shallowEqual);
//   const handleCheckboxChange = useCallback((e) => {
//       // dispatch({type: 'UPDATE_TODO', todo: {id, text, done: e.target.value}});
//       onTodoUpdate({dummyArray, id, text, done: e.target.value});
//   });
//   const handleTextChange = useCallback((e) => {
//       // dispatch({type: 'UPDATE_TODO', todo: {id, text: e.target.value, done}});
//       onTodoUpdate({dummyArray, id, done, text: e.target.value});
//   });
//   const handleBtnClick = useCallback(() => {
//       onTodoUpdate({id, done, text, dummyArray: [{name: "cat"}]});
//   });

//   console.log(`Todo item:${text}`);
//   return (
//       <li>
//           <input type="checkbox" checked={done} onChange={handleCheckboxChange}/>
//           <input type="text" value={text} onChange={handleTextChange}/>
//           <button onClick={handleBtnClick}>{todo.dummyArray[0].name}</button>
//       </li>
//   );
// }

const dummyTodos = [];
const nestedItems = [];
for(let i = 0; i<=20; i+=1) {
  nestedItems.push({
    id: Math.random().toString(16).slice(2),
    completed: false, 
    text: i,
    items: []
  });
}

for(let i = 0; i<=10; i+=1) {
  dummyTodos.push({
    id: Math.random().toString(16).slice(2),
    completed: false, 
    text: i,
    items: nestedItems
  });
}


function TodoItem(props) {
  const {id, completed, text, onCompletedChange, onTextChange} = props;
  return (
    <>
      <input type="checkbox" checked={completed} onChange={(e) => onCompletedChange(id, e.target.checked)}/>
      <input type="text" value={text} onChange={(e) => onTextChange(id, e.target.value)} />
    </>
  );
}

function App() {
  const [todos, setTodos] = useState(dummyTodos);
  const [todoInput, setTodoInput] = useState('');

  const handleInputKeyPress = (e) => {
      if(e.key === 'Enter') {
        setTodos([
          ...todos, 
          {id: Math.random().toString(16).slice(2),completed: false, text: todoInput}
        ]);
        setTodoInput('');
      }
  };

  const handleInputChange = (e) => {
    setTodoInput(e.target.value);
  };

  const handleTodoTextChange = (id, text, childId) => {

      setTodos(todos.map((todo) => {
        if(todo.id === id) {
          let items = todo.items;
          if(childId) {
            items = todo.items.map((item) => {
              if(item.id === childId) {
                return {...item, text: text};
              }
              return item;
            });

            return {...todo, items};
          }

          return  {...todo, text};
        }
        return todo;
      }));
  }

  const handleTodoCompletedChange = (id, completed, childId) => {
    setTodos(todos.map((todo) => {
      if(todo.id === id) {
        return {...todo, completed};
      }
      return todo;
    }));
  };

  return (
    <div className="App">
        <input type="text" 
          placeholder="To do" 
          onKeyPress={handleInputKeyPress} 
          onChange={handleInputChange}
          value={todoInput}
        />
        {/* <Profiler id="todo-profiler" onRender={(id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) => {
          console.log(phase);
          console.log(actualDuration);

        }} > */}
{todos.map((todo, index) => {
              return (
                <div key={index}>
                  <TodoItem 
                    id={todo.id}
                    completed={todo.completed}
                    text={todo.text}
                    onCompletedChange={handleTodoCompletedChange}
                    onTextChange={handleTodoTextChange}
                  />
                  <ul>
                    {todo.items.map((item) => {
                      return (
                        <li style={{'backgroundColor': 'red'}}>
                          <input type="checkbox" checked={item.completed} onChange={(e) => handleTodoCompletedChange(todo.id, e.target.checked, item.id)}/>
                          <input type="text" value={item.text} onChange={(e) => handleTodoTextChange(todo.id, e.target.value, item.id)} />
                        </li>
                        );
                    })}
                  </ul>
                </div>
              );
          })}
        {/* </Profiler> */}
        
    </div>
  );
}

export default App;
