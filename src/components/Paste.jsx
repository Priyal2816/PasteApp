import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes, resetAllPastes} from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";
import { FaRegCopy } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { FaShare } from "react-icons/fa";
import dateFormat from 'dateformat';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [share, setShare] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const filteredData = (pastes || []).filter(
    (paste) => paste?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function handleReset(pasteId){
    dispatch(resetAllPastes(pasteId))
  }
  function handleDelete(pasteId) {
      dispatch(removeFromPastes(pasteId));
  }
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check this out!",
          text: <div>{paste.content}</div>,
        });
        setShare(true);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      toast.success("shared successfully");
    }
  };
  return (
    <div className="focus:border-blue-400">
      <input 
        className="p-4 rounded-2xl m-4 min-w-[500px] border shadow-lg shadow-slate-50/25"
        type="search"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='flex flex-col gap-5 place-items-center'>
        {
          filteredData.length > 0 &&
            filteredData.map((paste) => {
              return (
                <div className="border  rounded-full w-[500px] p-4 flex flex-col place-items-center">
                  <div className="text-xl font-bold">{paste.title}</div>  
                  <div className="mt-1">{paste.content}</div>
                  <div className="flex flex-row gap-4 place-content-evenly mt-2 ">
                    <NavLink to={`/?pasteId=${paste?._id}`}>
                      <button><CiEdit /></button>
                    </NavLink>
                    <NavLink to={`/pastes/${paste?._id}`}>
                      <button><CiViewList /></button>
                    </NavLink>
                    <button onClick={() => handleDelete(paste?._id)}>
                      <MdDelete />
                    </button>
                    <button onClick={() => {
                      navigator.clipboard.writeText(paste.content);
                        toast.success("Copied to clipboard");
                      }}
                    >
                      <FaRegCopy />
                    </button>
                    <button
                      onClick={async () => {
                        if (navigator.share) {
                          try {
                            await navigator.share({
                              title: "Check this out!",
                              text: JSON.stringify(paste.content),
                            });
                            setShare(true);
                          } catch (error) {
                            console.error("Error sharing:", error);
                          }
                        } else {
                          toast.success("shared successfully");
                        }
                      }}
                      value={share ? "shared" : "share"}
                    >
                      <FaShare />
                    </button>
                  </div>
                  <div>{dateFormat(Date.now(), " mmm dS, yyyy, h:MM:ss TT")}</div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Paste;
