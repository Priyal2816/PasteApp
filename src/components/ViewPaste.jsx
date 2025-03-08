import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ViewPaste = () => {
  const {id} = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);
  const [title, setTitle] = useState(paste ? paste.title : "");
  const [content, setContent] = useState(paste ? paste.content : "");

  useEffect(() => {
    if (paste) {
      setTitle(paste.title);
      setContent(paste.content);
    }
  }, [paste]); 

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
      <input 
        className="p-2 rounded-2xl mt-2 w-[66%] pl-5"
        type="text"
        placeholder="enter title here"
        value={title}
        disabled
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
    <div className="mt-8">
      <textarea
        className="rounded-2xl mt-4, min-w-[500px] p-4"
        value={content}
        placeholder="enter content here"
        disabled
        onChange={(e) => setContent(e.target.value)}
        rows={20}
      />
     </div>
    </div>
  );
};

export default ViewPaste
