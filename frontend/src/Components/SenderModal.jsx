import React, { useRef, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import axiosInstance from "../utils/axiosInstance";
import UserListItem from "./UserListItem";

function SenderModal({ id, name, photo, groupChat, users }) {
  const chatname=useRef()
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);
  const [userList, setUserList] = useState(users);
//console.log(users)
  async function handleAddUser(query) {
    try {
      const response = await axiosInstance.get(`/allusers?search=${query}`);
      setResults(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddUserToGroup(newUser) {
    // Check if the user already exists in the group
    if (userList.some((x) => x._id === newUser._id)) {
      setError("User already exists in the group");
      setTimeout(() => setError(""), 5000);
      return;
    }

    try {
      const data = { users: [newUser] };
      await axiosInstance.put(`/chat/groupadd/${id}`, data);
      
      setUserList((prevUserList) => [...prevUserList, newUser]);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRename() {
   try {
    console.log("hello")
    const data={
      chatname:chatname.current.value
    }
   
    const response= await axiosInstance({method:"PUT",url:`/chat/rename/${id}`,data:data})
   } catch (error) {
    console.log(error);
   }
    
  }

  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>
        <FaEye />
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* Close modal button */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          {name ? (
            <h3 className="font-bold text-lg">{name}</h3>
          ) : (
            <div>
              <h1 className="font-bold text-xl mb-3">{groupChat}</h1>
              <div>
                <input
                ref={chatname}
                  type="text"
                  placeholder="Update Chatname"
                  className="border p-1 w-[80%] mr-2 bg-gray-100"
                />
                <button onClick={handleRename} className="p-1 bg-green-400 rounded-md text-white">Update</button>
              </div>
              {userList.map((user) => (
                <span key={user._id} className="badge">
                  {user.name}
                </span>
              ))}
              <input
                onChange={(e) => handleAddUser(e.target.value)}
                type="text"
                placeholder="Add User to group"
                className="border p-1 w-[85%] mr-2 bg-gray-100"
              />
              <br />
              {error && <p className="text-red-500">{error}</p>}
              {results.map((result) => (
                <div key={result._id} onClick={() => handleAddUserToGroup(result)}>
                  <UserListItem id={result._id} name={result.name} photo={result.photo} email={result.email} />
                </div>
              ))}
              <div>
                <button className="p-1 bg-red-500 text-white rounded-md" >
                  Leave Group
                </button>
              </div>
            </div>
          )}
          <figure>
            <img src={photo} alt="" />
          </figure>
        </div>
      </dialog>
    </div>
  );
}

export default SenderModal;
