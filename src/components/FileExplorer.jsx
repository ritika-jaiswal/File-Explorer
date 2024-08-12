
import React, { useState } from "react";
import { FaFolder, FaFile, FaPen, FaTrash, FaPlus, FaEye, FaEdit } from 'react-icons/fa'

export const FileExplorer = ({ data, onAdd, onDelete, onRename, onOpen, path = 'root' }) => {
    const [expanded, setExpanded] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [newFileName, setFileNewName] = useState('');

    // const handlExpand = () => setExpanded(!expanded);
    // const handleRename = () => {
    //     setRenaming(!renaming);
    //     if(renaming) onRename(path,newName);
    // };



    // const handleInputchange = (e) => setNewName(e.target.value);

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            onAdd(file);

        }
    }

    const handleEdit = (file) => {
        setIsEditing(true);
        setFileNewName(file.name);
    };

    const handleUpdate = (file) => {
        onRename(file, newFileName);
        setIsEditing(false);
    }

    return (
        <div className="mb-4">
            <div className="flex items-center bg-gray-200 p-2 rounded">
                <button onClick={handleToggle}>
                    {expanded ? <FaFolder className="text-yellow-500" /> : <FaFolder className="text-yellow-300" />}

                </button>
                <span className="ml-2 font-semibold text-gray-700">{data.name}</span>
                <label htmlFor="file-upload" className="ml-auto cursor-pointer text-blue-500">
                    <FaPlus className=" text-blue-500 hover:text-blue-600" />
                </label>
                <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                />
            </div>

            {expanded && (
                <div className="ml-4">
                    {
                        data.children && Object.keys(data.children).map((key) => (
                            <FileExplorer
                                key={key}
                                data={data.children[key]}
                                onAdd={onAdd}
                                onDelete={onDelete}
                                onRename={onRename}
                                onOpen={onOpen}
                            />
                        ))
                    }

                    {data.files &&
                        data.files.map((file) => (
                            <div key={file.name} className="flex items-center mb-2 bg-white p-2 rounded shadow-sm">
                                <FaFile className="mr-2 text-blue-400" />
                                {isEditing ? (
                                    <input
                                        className="border p-1 rounded"
                                        value={newFileName}
                                        onChange={(e) => setFileNewName(e.target.value)}
                                    />
                                ) : (
                                    <span className="cursor-pointer text-gray-800"
                                        onClick={() => onOpen(file)}
                                    >
                                        {file.name}
                                    </span>
                                )
                                }
                                {isEditing ? (
                                    <button className="ml-2 text-green-800 " onClick={() => onOpen(file)}>
                                        Save
                                    </button>
                                ) : (
                                    <>
                                        <FaEye className="ml-4 cursor-pointer text-gray-500 hover:text-gray-700" onClick={() => onOpen(file)} />
                                        <FaEdit className="ml-2 cursor-pointer text-yellow-500 hover:text-yellow-700" onClick={() => handleEdit(file)} />
                                        <FaTrash
                                            className="ml-2 cursor-pointer text-red-500 hover:text-red-700"
                                            onClick={() => onDelete(file)}
                                        />
                                    </>
                                )}



                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};