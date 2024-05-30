import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
uuidv4();


const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }, [todos]);

    const addTodo = (text) => {
        const newTodo = {id: uuidv4() , task:text, completed: false , isEditing: false};
        setTodos([...todos, newTodo]);
    }

    const toggleTodo = (index) => {
        const newTodos = todos.map((todo, i) => {
            if (i === index) {
                return { ...todo, completed: !todo.completed, completedAt: !todo.completed ? new Date().toISOString() : null };
            }
            return todo
        })
        setTodos(newTodos)
    }

    const editTask = (task, id) => {
        const newTodos = todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }


    const deleteTodo = ( id )=> {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    return (
        <TodoContext.Provider value={{ todos, addTodo, toggleTodo , deleteTodo , editTask}}>
            {children}
        </TodoContext.Provider>
    )
}

export const useTodos = () => {
    const context = useContext(TodoContext)
    return context;
}

export default TodoContext;