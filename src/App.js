import { useState } from 'react';

function App() {
  const [work, setWork] = useState('');

  return (
    <div className="flex gap-8 h-screen border border-red-300  justify-center items-center">
      <input type="text" value={work} onChange={(e) => setWork(e.target.value)} className="outline-none border border-blue-600 px-4 py-2 w-[400px]" />
      <button type="button" className="outline-none px-4 py-2 bg-blue-500 rounded-md text-white">
        Add
      </button>
    </div>
  );
}

export default App;
