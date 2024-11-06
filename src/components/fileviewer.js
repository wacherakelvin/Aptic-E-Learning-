import React from 'react';

const FileViewer = ({ file }) => {
  const downloadFile = () => {
    const link = document.createElement('a');
    link.href = `http://localhost:5000${file.url}`; // Adjust URL as necessary
    link.download = file.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h3>{file.title}</h3>
      {file.type === 'pdf' ? (
        <iframe
          src={`http://localhost:5000${file.url}`}
          width="600"
          height="400"
          title={file.title}
        />
      ) : (
        <video width="600" controls>
          <source src={`http://localhost:5000${file.url}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <button onClick={downloadFile}>Download</button>
    </div>
  );
};

export default FileViewer;
