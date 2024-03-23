import React, { useState } from 'react';
import './product.css';

function FileInputExample() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
    console.log(selectedFiles)
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
      {selectedFiles.length > 0 && (
        <div>
          <h2>Selected Files:</h2>
          <ul>
            {Array.from(selectedFiles).map((file, index) => (
              <li key={index}>{file.type}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FileInputExample;
