import { useEffect, useState } from 'react';
import './App.css';
import AddTodo from './Components/addTodo';
import TodoList from './Components/TodoList';
import { useTodos } from './Context/TodoContext';

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { todos } = useTodos();

  useEffect(() => {
    if (todos.length > 0) {
      setTasks(todos);
    }
  }, [todos]);

  useEffect(() => {
    const filteredTasks = todos.filter((todo) =>
      todo.task.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTasks(filteredTasks);
  }, [searchTerm, todos]);

  return (
    <div className="App">
      <div className="flex  justify-center pt-3 bg-[#0264F6] w-100 text-white mb-3 xl:w-[100%]">
        <div className="relative mb-4 flex w-96 flex-wrap items-stretch">
          <input
            type="search"
            className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-white px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <span
            className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
            id="basic-addon2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </span>


          <div className='flex justify-center items-center '>
            <button className='mr-4'>
              Filter
            </button>
            <button>
              Sort
            </button>
          </div>

        </div>
      </div>

      <AddTodo />
      <TodoList tasks={tasks} />
    </div>
  );
}

export default App;
