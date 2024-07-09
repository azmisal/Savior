"use client"
import React, { useState } from "react";
import Style from "@/app/Styles/Texts.module.css";
import { Button } from "@/components/ui/button";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoIosCopy } from "react-icons/io";
import SpinLoader from "../Components/SpinLoader";
import { FiEdit } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { BsCloudDownload } from "react-icons/bs";

interface Texts {
  id: number;
  title: string;
  text: string;
  file?: File | null;
}

export default function Images() {
  const [clickedIndex, setClickedIndex] = useState<string | null>(null);
  const [addTexts, setAddTexts] = useState<boolean>(false);
  const [Files, setFiles] = useState<Texts[]>([
    { id: 1, title: 'John Doe', text: 'john@example.com' },
    { id: 2, title: 'Jane Smith', text: 'jane@example.com' },
    { id: 3, title: 'Mike Johnson', text: 'mike@example.com' },
  ]);
  const [visibility, setVisibility] = useState<string | boolean>(false);
  const [newTexts, setNewTexts] = useState<Texts>({ id: 0, title: '', text: '', file: null });
  const [loading, setLoading] = useState<boolean>(false);
  const [editTexts, setEditTexts] = useState<Texts | null>(null);
  const [edit, setEdit] = useState<string | false>(false);
  
  const handleIconClick = (index: string) => {
    setClickedIndex(index);
    if (index != null) {
      navigator.clipboard.writeText(index).catch(err => { alert("Error occurred " + err) })
    }
    setTimeout(() => setClickedIndex(null), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTexts({
      ...newTexts,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewTexts({
      ...newTexts,
      file,
    });
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editTexts) {
      setEditTexts({ ...editTexts, [name]: value });
    }
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (editTexts) {
      setEditTexts({ ...editTexts, file });
    }
  };

  const handleEdit = (Texts: Texts, val: string) => {
    setEditTexts(Texts);
    setEdit(val);
  };

  const handleSave = () => {
    if (editTexts) {
      setFiles(Files.map(Texts => (Texts.id === editTexts.id ? editTexts : Texts)));
      setEditTexts(null);
      setEdit(false);
    }
  };

  const handleSubmit = () => {
    if (newTexts.title && newTexts.text) {
      setLoading(true);
      setTimeout(() => {
        setFiles([...Files, { ...newTexts, id: Files.length + 1 }]);
        setNewTexts({ id: 0, title: '', text: '', file: null });
        setLoading(false);
        setAddTexts(false);
      }, 3000);
    }
  };

  return (
    <div className={`${Style.Text} text-left flex items-center flex-col`}>
      <div className="w-11/12 text-left">
        <h1 className="text-slate-400 uppercase font-semibold text-3xl mb-8">Images</h1>
        <div className="border-b-2 border-zinc-700 mb-4" />
        <Button className="bg-custom-blue mb-4" title="New text" onClick={() => setAddTexts(!addTexts)}>Add</Button>
      </div>
      {addTexts && (
        <div className={`${Style.addCard} text-left relative p-8 flex-col w-1/2 items-center mb-8 border border-zinc-600 rounded-3xl`}>
          <Button onClick={handleSubmit} className="absolute top-8 right-8">Save</Button>
          <h1 className="text-white mr-2 mt-2 flex items-center font-bold mb-8">Add Text</h1>
          <div className="flex items-start">
            <h1 className="text-white mr-2 flex items-center">Title :</h1>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={newTexts.title}
              onChange={handleInputChange}
              className="w-52 p-2 bg-gray-800 text-white ml-4 mb-4"
            />
          </div>
          <div className={`${Style.addtext} items-start`}>
            <h1 className="text-white mr-4 flex items-center">File :</h1>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-72 p-2 bg-gray-800 text-white ml-4 mb-4"
            />
            {newTexts.file && (
              <div className="ml-4">
                <p className="text-white">{newTexts.file.name}</p>
              </div>
            )}
          </div>
          
        </div>
      )}
      {loading ? (
        <div className="flex fixed top-0 bg-custom-gradient left-0 items-center justify-center w-screen h-screen">
          <SpinLoader />
        </div>
      ) : (
        <>
          {Files.map((Texts) => (
            <div
              className={`${Style.card} text-left p-8 flex-col w-1/2 items-center mb-8 border border-zinc-600 rounded-3xl`}
              key={Texts.id}
            >
              <div className={`${Style.title} text-left flex w-full items-center mb-4`}>
                <h1 className="text-white mr-2 flex items-center">
                  Title :{' '}
                  {editTexts?.id === Texts.id ? (
                    <input
                      type="text"
                      name="title"
                      value={editTexts.title}
                      onChange={handleEditInputChange}
                      className="w-52 p-2 flex bg-gray-800 text-white ml-6 items-start text-start"
                    />
                  ) : (
                    <span className="ml-6 w-52 p-2 bg-gray-800 overflow-x-hidden block">
                      {Texts.title}
                    </span>
                  )}
                </h1>
                {clickedIndex === Texts.title ? (
                  <IoMdCheckmarkCircleOutline className="text-green-500 cursor-pointer mr-4" />
                ) : (
                  <IoIosCopy
                    className="text-zinc-400 cursor-pointer active:text-black mr-4"
                    title="Copy"
                    onClick={() => handleIconClick(Texts.title)}
                  />
                )}
                {edit === Texts.title ? (
                  <Button className="" onClick={handleSave}>Save</Button>
                ) : (
                  <FiEdit
                    className="text-zinc-400 cursor-pointer active:text-black"
                    title="Edit"
                    onClick={() => handleEdit(Texts, Texts.title)}
                  />
                )}
              </div>
              <div className={`${Style.text} flex items-center h-max w-full`}>
                <h1 className="text-white flex items-start">
                  File : {' '}
                  {editTexts?.id === Texts.id ? (
                    <>
                      <input
                        type="file"
                        onChange={handleEditFileChange}
                        className="w-52 p-2 bg-gray-800 text-white ml-8"
                      />
                      {editTexts.file && (
                        <div className="ml-4">
                          <p className="text-white">{editTexts.file.name}</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <span className="ml-8 w-52 mr-2 p-2 bg-gray-800 overflow-x-hidden block">
                      {Texts.file?.name || "No file uploaded"}
                    </span>
                  )}
                </h1>
                {clickedIndex === Texts.text ? (
                  <IoMdCheckmarkCircleOutline className="text-green-500 cursor-pointer mr-4" />
                ) : (

                  <BsCloudDownload
                    className="text-zinc-400 cursor-pointer active:text-black mr-4"
                    title="Copy"
                    onClick={() => handleIconClick(Texts.text)}
                  />
                )}
                {edit === Texts.text ? (
                  <Button onClick={handleSave}>Save</Button>
                ) : (
                  <FiEdit
                    className="text-zinc-400 cursor-pointer active:text-black"
                    title="Edit"
                    onClick={() => handleEdit(Texts, Texts.text)}
                  />
                )}
              </div>
              
            </div>
          ))}
        </>
      )}
    </div>
  );
}
