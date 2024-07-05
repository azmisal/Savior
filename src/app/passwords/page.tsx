"use client"
import React, { useState } from "react";
import Style from "@/app/Styles/Password.module.css";
import { Button } from "@/components/ui/button";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoIosCopy } from "react-icons/io";
import SpinLoader from "../Components/SpinLoader";
interface User {
  id: number;
  username: string;
  password: string;
}

export default function Password() {
  const [clickedIndex, setClickedIndex] = useState<string | null>(null);
  const [addUser, setAddUser] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([
    { id: 1, username: 'John Doe', password: 'john@example.com' },
    { id: 2, username: 'Jane Smith', password: 'jane@example.com' },
    { id: 3, username: 'Mike Johnson', password: 'mike@example.com' },
  ]);
  const [newUser, setNewUser] = useState<User>({ id: 0, username: '', password: '' });
  const [loading, setLoading] = useState<boolean>(false);

  const handleIconClick = (index: string) => {
    setClickedIndex(index);
    if (index != null) {
      navigator.clipboard.writeText(index).catch(err => { alert("Error occurred " + err) })
    }
    setTimeout(() => setClickedIndex(null), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  }

  const handleSubmit = () => {
    if (newUser.username && newUser.password) {
      setLoading(true);
      setTimeout(() => {
        setUsers([...users, { ...newUser, id: users.length + 1 }]);
        setNewUser({ id: 0, username: '', password: '' });
        setLoading(false);
        setAddUser(false);
      }, 3000);
    }
  }

  return (
    <div className={`${Style.Password} text-left h-screen flex items-center flex-col`}>
      <div className="w-11/12 text-left">
        <h1 className="text-slate-400 uppercase font-semibold text-3xl mb-8">Passwords</h1>

        <div className="border-b-2 border-zinc-700 mb-4" />
        <Button className="bg-custom-blue mb-4" title="New Password" onClick={() => setAddUser(true)}>Add</Button>
      </div>
      {loading ? (
        <div className="flex fixed top-0 bg-custom-gradient	left-0 items-center justify-center w-screen h-screen">
          <SpinLoader />
        </div>
      ) : (
        <>
          {users.map((user) => {
            return (
              <div
                className={`${Style.card} h-12 flex w-11/12 items-center mb-8 border-b border-zinc-600 rounded-lg`}
                key={user.id}
              >
                <div className={`${Style.username} flex w-1/2 mr-32 items-center`}>
                  <h1 className="text-white ml-4 mr-2 flex items-center">
                    UserName/Email :{' '}
                    <span className="w-52 p-2 bg-gray-800 overflow-x-hidden block ml-4">
                      {user.username}
                    </span>
                  </h1>
                  {clickedIndex === user.username ? (
                    <IoMdCheckmarkCircleOutline className="text-green-500 cursor-pointer" />
                  ) : (
                    <IoIosCopy
                      className="text-zinc-400 cursor-pointer active:text-black"
                      title="Copy"
                      onClick={() => handleIconClick(user.username)}
                    />
                  )}
                </div>
                <div className={`${Style.password} flex items-center w-1/2`}>
                  <h1 className="text-white flex items-center">
                    Password :{' '}
                    <span className="w-52 p-2 mr-2 bg-gray-800 overflow-x-hidden block ml-4">
                      {user.password}
                    </span>
                  </h1>
                  {clickedIndex === user.password ? (
                    <IoMdCheckmarkCircleOutline className="text-green-500 cursor-pointer" />
                  ) : (
                    <IoIosCopy
                      className="text-zinc-400 cursor-pointer active:text-black"
                      title="Copy"
                      onClick={() => handleIconClick(user.password)}
                    />
                  )}
                </div>
              </div>
            );
          })}
          {addUser && (
            <div className="addNew">
              <input
                type="text"
                placeholder="Username/Email"
                name="username"
                value={newUser.username}
                onChange={handleInputChange}
                className="p-2 mr-2 bg-gray-800 text-white"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                className="p-2 mr-2 bg-gray-800 text-white"
              />
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
