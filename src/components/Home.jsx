import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);
    
  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId ||  Date.now().toString(36),
      createdAt:new Date().toISOString(),
    };

    if(pasteId) {
      //update
      dispatch(updateToPastes(paste));    
    }
    else {
      //create
      dispatch(addToPastes(paste));
    }

    //after creation or updation
    setTitle("");
    setValue("");
    setSearchParams({});
  }
        
  return (
      <div>
        <div className="flex justify-center">
          <input 
            className="text-black rounded-2xl border p-2 m-4 w-[500px]"
            type="text"
            placeholder=" Enter your title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <textarea
            className="rounded-2xl mt-4, min-w-[500px] h-[450px]  border p-4"
            value={value}
            placeholder="Enter your content"
            onChange={(e) => setValue(e.target.value)}
            rows={20}   
          ></textarea>
          <br />
          <button onClick={createPaste} className="w-full mt-4 bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
            {pasteId ? "Update My Paste" : "Create my Paste"}
          </button>
        </div>
      </div>

  );
};

export default Home
