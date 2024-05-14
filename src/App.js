import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [work, setWork] = useState('');
  const [todos, setTodos] = useState([]);
  const handleAdd = () => {
    if (todos?.some((item) => item.id === work?.replace(/\s/g, ''))) {
      toast.warn('Công việc đã được thêm trước đó');
    } else {
      setTodos((prev) => [...prev, { id: work?.replace(/\s/g, ''), job: work }]);
      setWork('');
    }
  };

  const handleDeleteJob = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <>
      <div className="flex flex-col gap-8 h-screen border border-red-300  justify-center items-center">
        <div className="flex gap-8">
          <input type="text" value={work} onChange={(e) => setWork(e.target.value)} className="outline-none border border-blue-600 px-4 py-2 w-[400px]" />
          <button type="button" onClick={handleAdd} className="outline-none px-4 py-2 bg-blue-500 rounded-md text-white">
            Add
          </button>
        </div>
        <div>
          <h3 className="font-bold text-xl">Content:</h3>
          <ul>
            {todos.map((item) => (
              <li key={item.id} className="flex gap-5 items-center">
                <span className="my-2">{item.job}</span>
                <span onClick={() => handleDeleteJob(item.id)} className="my-2 cursor-pointer py-2">
                  ❌
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  );
}

export default App;
