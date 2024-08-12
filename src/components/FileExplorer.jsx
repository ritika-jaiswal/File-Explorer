
import React, { useState } from 'react';
import { FaFolder, FaFile, FaPlus, FaTrash, FaEdit, FaEye } from 'react-icons/fa';

const FileExplorer = ({ data, onFileAdd, onFileOpen, onUpdate, onDelete }) => {
  const [expanded, setExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleEdit = (file) => {
    setIsEditing(file.name);
    setNewFileName(file.name);
  };

  const handleUpdate = (file) => {
    onUpdate(file, newFileName);
    setIsEditing(false);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center bg-gray-200 p-2 rounded">
        <button onClick={handleToggle}>
          {expanded ? <FaFolder className="text-yellow-500" /> : <FaFolder className="text-yellow-300" />}
        </button>
        <span className="ml-2 font-semibold text-gray-700">{data.name}</span>
        <label htmlFor="file-upload" className="ml-auto cursor-pointer text-blue-500">
          <FaPlus className="hover:text-blue-700" />
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={onFileAdd}
        />
      </div>

      {expanded && (
        <div className="ml-6 mt-2">
          {data.files &&
            data.files.map((file) => (
              <div key={file.name} className="flex items-center mb-2 bg-white p-2 rounded shadow-sm">
                <FaFile className="mr-2 text-blue-400" />
                {isEditing === file.name ? (
                  <input
                    className="border p-1 rounded"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                  />
                ) : (
                  <span className="cursor-pointer text-gray-800" onClick={() => onFileOpen(file)}>
                    {file.name}
                  </span>
                )}
                {isEditing === file.name ? (
                  <button className="ml-2 text-green-500 hover:text-green-700" onClick={() => handleUpdate(file)}>
                    Save
                  </button>
                ) : (
                  <>
                    <FaEye className="ml-4 cursor-pointer text-gray-500 hover:text-gray-700" onClick={() => onFileOpen(file)} />
                    <FaEdit className="ml-2 cursor-pointer text-yellow-500 hover:text-yellow-700" onClick={() => handleEdit(file)} />
                    <FaTrash className="ml-2 cursor-pointer text-red-500 hover:text-red-700" onClick={() => onDelete(file)} />
                  </>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
