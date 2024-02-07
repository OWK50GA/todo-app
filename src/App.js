import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

function App() {

  const [todos, setTodos] = useState(null);
  const [isBtnCompleted, setIsBtnCompleted] = useState(false);
  const jsonServerUrl = process.env.JSON_SERVER_URL || 'http://localhost:3300/todos';
  const getData = () => {
    fetch(`${jsonServerUrl}`)
      .then(res => {
        return res.json();
      })
        .then((data) => {
          setTodos(data);
        })
  }

  useEffect(() => {
    getData();
    console.log(todos)
  },[])

  const handleDelete = (id) => {
    fetch(`${jsonServerUrl}/` + id, {
      method: 'DELETE'
    })
      .then(() => {
        getData();
      })
  }

  const handleComplete = (id) => {
    fetch(`${jsonServerUrl}/` + id)
      .then(res => {
        return res.json();
      })
        .then((obj) => {
          if (obj.completed === "false") {
            obj.completed = "true";
          } else {
            obj.completed = "false";
          }
          return obj;
        })
          .then((obj) => {
            fetch(`${jsonServerUrl}/` + id, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(obj) 
            }).then(() => {
                getData();
            })
          });
  }

  const handleCompletedBtn = () => {
    isBtnCompleted? setIsBtnCompleted(false):setIsBtnCompleted(true);
  }

  return (
    <div className="App">
      <div className="content">
        <h1>Todo App</h1>
        <h2>Enter a Task</h2>
        <div className="todo-block">
          <TodoForm getData={getData} jsonServerUrl={jsonServerUrl}/>
          {/* <h1>{title}</h1> */}
          <div className="todo-list">
            <h2>Todo-List</h2>
            {isBtnCompleted? <button onClick={handleCompletedBtn}>All My Todos</button>:<button onClick={handleCompletedBtn}>What I have Completed</button>}
            {/* <button>Todo</button>
            <button onClick={handleCompletedBtn}>Completed</button> */}
            {todos && <TodoList 
            todos={todos}
            handleDelete={handleDelete}
            handleComplete={handleComplete}
            isBtnCompleted={isBtnCompleted}/>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
