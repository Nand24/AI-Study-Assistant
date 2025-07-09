import React, { useRef } from 'react';
import { FaFilePdf, FaCloudUploadAlt } from 'react-icons/fa';

const PdfUploadBox = ({ onFileUpload , loading }) => {
  const inputRef = useRef();

  const handleFileChange = (e) => {
  const file = e.target.files[0];
  console.log("Selected file:", file); 

  if (file && file.type === "application/pdf" && file.size <= 10 * 1024 * 1024) {
    onFileUpload(file);
  } else {
    alert("Please upload a valid PDF under 10MB.");
  }
};


  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf" && file.size <= 10 * 1024 * 1024) {
      onFileUpload(file);
    } else {
      alert("Only PDF files under 10MB are allowed.");
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <>
    
<div className='w-full flex items-center justify-center mt-10 '>
            <div className='w-[30vw] flex flex-col gap-3 items-center justify-center'>
                <h1 className='text-3xl font-semibold text-black '>Upload a <span class="inline-block bg-black text-white px-4 py-1 rounded-lg transform -skew-x-12">PDF</span></h1>
                <p className='text-lg text-zinc-600 text-center'>To get your Summary, Quizz, True/False, Question/Answer</p>
                <p className='text-sm text-zinc-500 text-center'>Transform your PDF experience: Dive into dynamic conversations for instant insights and enhanced productivity. Your documents, reimagined with Chat with PDF.</p>
            </div>
            </div>
            <div className='w-full flex items-center justify-center mt-10'>
                <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={handleClick}
      className="w-[30vw] h-[330px] cursor-pointer border-2 border-dashed border-blue-400 rounded-xl flex flex-col items-center justify-center gap-3 bg-white text-center"
    >
      <div className="bg-blue-100 p-4 rounded-full">
        <FaFilePdf className="text-blue-600 text-3xl" />
      </div>
      <p className="text-lg font-medium text-zinc-800">Click to upload, or drag PDF here</p>
      <p className="text-sm text-zinc-500">Maximum file size: 10MB</p>
      <button
        disabled={loading}
        onClick={handleClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-white cursor-pointer ${
          loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        <FaCloudUploadAlt />
        {loading ? 'Uploading...' : 'Click to Upload'}
      </button>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        ref={inputRef}
        className="hidden"
      />
    </div>
    </div>
    </>
  );
};

export default PdfUploadBox;

