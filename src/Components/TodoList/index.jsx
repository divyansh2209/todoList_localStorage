import React, { useState } from 'react'
import { useTodos } from '../../Context/TodoContext'
import { EditTodoForm } from '../editTodo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'


const TodoList = ({tasks}) => {
    const { toggleTodo, deleteTodo, editTask } = useTodos();


    return (
        <div className="w-full text-center flex items-center flex-col gap-5 ">
            <h1 className="text-blue-600 uppercase font-semibold text-2xl">Task List</h1>
            <div className="w-1/2 bg-slate-300 backdrop-blur-lg px-3 py-5 rounded-md">
                {tasks.map((todo, index) => (
                    todo.isEditing ? (
                        <EditTodoForm task={todo} />
                    ) :
                        (
                            <div key={index} className="flex justify-between items-center mb-5 pb-2 border-b-2">
                                <input className='form-checkbox h-5 w-5 text-blue-600' type="checkbox" checked={todo.completed} onChange={() => { toggleTodo(index) }} />
                                <li className={`list-none w-2/3 font-bold text-left break-normal ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                                    {todo.task}
                                </li>
                                {/* {todo.completed && todo.completedAt && (
                            <span className="text-sm text-gray-500 ml-2">
                                Completed At: {new Date(todo.completedAt).toLocaleString()}
                            </span>
                        )} */}
                                <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => editTask(todo.id)} />
                                <div className="flex gap-3">
                                    <button
                                        className="bg-white text-blue-600 px-2 py-2 font-medium rounded-md"
                                        onClick={() => deleteTodo(todo.id)}
                                    >
                                        Delete
                                    </button>
                                </div>

                            </div>
                        )
                ))}
            </div>
        </div>
    );
}

export default TodoList;
