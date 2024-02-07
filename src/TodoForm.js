import { useState } from "react";

const TodoForm = ({getData}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const todo = {title, description, completed: "false"}

        fetch('http://localhost:3300/todos', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(todo) 
            }).then(() => {
                getData();
            });
    
        setTitle('');
        setDescription('');
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="todo-input">
              <div className="todo-input-item">
                <label>Todo Item Title</label>
                <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required/>
              </div>
              <div className="todo-input-item">
                <label>Todo Item Description</label>
                <input 
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required/>
              </div>
            </div>
            <div className="todo-input-item">
                <button>Add</button>
              </div>
          </form>
    );
}
 
export default TodoForm;