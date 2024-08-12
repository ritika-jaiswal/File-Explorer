
import './App.css';
import { useState } from 'react';
import { FileExplorer } from './components/FileExplorer';
import { addFile, updateFile, deleteFile, openFile } from './features/fileSystem/FileSystemSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {

  const [fileSystem, SetFileSystem] = useState({
    name: 'root',
    children: {},
    files: [],
  });
  const dispatch = useDispatch();

  // const updateFileSystem = (newFileSystem) => SetFileSystem({...newFileSystem});



  const handleAdd = (file) => {
    SetFileSystem((prevFileSystem) => {
      const updateFiles = [...prevFileSystem.files, file]
      return { ...prevFileSystem, files: updateFiles };
    });
    // dispatch(addFile(file));

  };

  const handleOpen = (file) => {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, '_blank')
    // dispatch(openFile(file))
  };


  const handleDelete = (file) => {
    SetFileSystem((prevFileSystem) => {
      const updateFiles = prevFileSystem.files.filter((f) => f !== file);
      return { ...prevFileSystem, files: updateFiles };
    });
    // dispatch(deleteFile(file));

  };

  const handleRename = (file, newName) => {
    SetFileSystem((prevFileSystem) => {
      const updatedFiles = prevFileSystem.files.map((f) => {
        if (f === file) {
          const updatedFiles = new File([f], newName, { type: f.type });
          return updatedFiles;
        }
        return f;
      });
      return { ...prevFileSystem, files: updatedFiles };
    });
    // dispatch(updateFile({file, newName}));
  };

  return (
    // <div className="p-8">
    //   <h1 className='text-2xl font-bold'>React File Explorer</h1>
    //   <FileExplorer
    //   data = {fileSystem.root}
    //   onAdd = {handleAdd}
    //   onDelete = {handleDelete}
    //   onRename = {handleRename}
    //   onOpen = {handleOpen}
    //   />

    // </div>
    <div className='p-8 bg-gray-100 min-h-screen'>
      <h1 className='text-4xl font-bold mb-8 text-gray-800 text-center'>
        React File Explorer
      </h1>
      <div className='bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto'>
        <FileExplorer
          data={fileSystem}
          onAdd={handleAdd}
          onDelete={handleDelete}
          onRename={handleRename}
          onOpen={handleOpen}
        />

      </div>

    </div>
  );
};


export default App;
