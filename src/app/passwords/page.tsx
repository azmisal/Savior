"use client"
import React, { useState } from "react";
import Style from "@/app/Styles/Password.module.css";
import { Button } from "@/components/ui/button";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoIosCopy } from "react-icons/io";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Password() {
  const [clickedIndex, setClickedIndex] = useState<string | null>(null);

  const handleIconClick = (index: string) => {
    setClickedIndex(index);
    setTimeout(() => setClickedIndex(null), 2000); // Reset after 2 seconds
  };

  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com' },
  ];

  return (
    <div className={`${Style.Password} text-left h-screen flex items-center flex-col`}>
      <div className="w-11/12 text-left">
        <h1 className="text-slate-400 uppercase font-semibold text-3xl mb-8">Passwords</h1>

        <div className="border-b-2 border-zinc-700 mb-4" />
        <Button className="bg-custom-blue mb-4" title="New Pasword">Add</Button>
      </div>
      {users.map((user, index) => {
        return (
          <div
            className={`${Style.card} h-12 flex w-11/12 items-center mb-8 border-b border-zinc-600 rounded-lg`}
            key={user.id}
          >
            <div className={`${Style.username} flex w-1/2 mr-32 items-center`}>
              <h1 className="text-white ml-4 mr-2 flex items-center">
                UserName/Email :{' '}
                <span className="w-52 p-2 bg-gray-800 overflow-x-hidden block ml-4">
                  {user.name}
                </span>
              </h1>
              {clickedIndex === user.name ? (
                <IoMdCheckmarkCircleOutline className="text-green-500 cursor-pointer" />
              ) : (
                <IoIosCopy
                  className="text-zinc-400 cursor-pointer active:text-black"
                  title="Copy"
                  onClick={() => handleIconClick(user.name)}
                />
              )}
            </div>
            <div className={`${Style.password} flex items-center w-1/2`}>
              <h1 className="text-white flex items-center">
                Password :{' '}
                <span className="w-52 p-2 mr-2 bg-gray-800 overflow-x-hidden block ml-4">
                  {user.email}
                </span>
              </h1>
              {clickedIndex === user.email ? (
                <IoMdCheckmarkCircleOutline className="text-green-500 cursor-pointer" />
              ) : (
                <IoIosCopy
                  className="text-zinc-400 cursor-pointer active:text-black"
                  title="Copy"
                  onClick={() => handleIconClick(user.email)}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}