import React, { useState } from 'react'
import { useTodos } from '../../Context/TodoContext'

const AddTodo = () => {
    const [text, setText] = useState('');
    const { addTodo } = useTodos();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return
        addTodo(text);
        setText('');
    }

    return (
        <div className="my-5 flex justify-center items-center flex-col gap-8">
            <form onSubmit={handleSubmit} className="flex justify-center items-center gap-6">
                <input className="w-72 border-2  rounded-md px-3 py-3 bg-[#E8ECF4] backdrop-blur-lg" type="text" value={text} placeholder='Add a new Todo' onChange={(e) => setText(e.target.value)} />
                <button className="h-full px-5 py-2 bg-[#0264F6] text-white font-medium rounded-md" type='submit'> Add Todo </button>
            </form>
        </div>
    )
}

export default AddTodo