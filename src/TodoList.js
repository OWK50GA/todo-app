// import { IoIosCheckmarkCircleOutline } from "react-icons/io";
const TodoList = ({todos, handleDelete, handleComplete, isBtnCompleted}) => {
    // const todos = props.todos
    
    return (
        <ul>
            {
                !isBtnCompleted && 
                todos.map((todo) => (
                    <div className="todo-item" key={todo.id} style={{background: todo.completed === "true"? '#b9c3be': '#363636', 
                    color: todo.completed === "true"? 'black': '#b9c3be'}}>
                        <h3>{ todo.title }</h3>
                        <p>{ todo.description }</p>
                        <button onClick={() => handleDelete(todo.id)}>Delete Task</button>
                        {
                            todo.completed === "false"?
                            <button onClick={() => {handleComplete(todo.id)}}>Mark as Complete</button>:
                            <button onClick={() => {handleComplete(todo.id)}}>Remove from Complete</button>
                        }
                    </div>
                ))
            }
            {
                isBtnCompleted && 
                todos.filter((todo) => {
                    return todo.completed === "true";
                }).map((todo) => (
                    <div className="todo-item" key={todo.id} style={{background: todo.completed === "true"? '#b9c3be': '#363636',
                    color: todo.completed === "true"? 'black': '#b9c3be'}}>
                        <h3>{ todo.title }</h3>
                        <p>{ todo.description }</p>
                        <button onClick={() => handleDelete(todo.id)}>Delete Task</button>
                        <button onClick={() => {handleComplete(todo.id)}}>Mark as Completed</button>
                    </div>
                ))
            }
        </ul> 
    );
}
 
export default TodoList
