
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFile, updateFile, deleteFile, openFile } from './features/fileSystem/FileSystemSlice';
import FileExplorer from './components/FileExplorer';

const App = () => {
  const fileSystem = useSelector((state) => state.fileSystem);
  const dispatch = useDispatch();

  const handleFileAdd = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch(addFile({
          name: file.name,
          content: e.target.result,
          type: file.type,
        }));
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleFileOpen = (file) => {
    dispatch(openFile(file));
  };

  const handleFileUpdate = (file, newName) => {
    dispatch(updateFile({ file, newName }));
  };

  const handleFileDelete = (file) => {
    dispatch(deleteFile(file));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen" >
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">React File Explorer</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <FileExplorer
          data={fileSystem}
          onFileAdd={handleFileAdd}
          onFileOpen={handleFileOpen}
          onUpdate={handleFileUpdate}
          onDelete={handleFileDelete}
        />
      </div>
    </div>
  );
};

export default App;
