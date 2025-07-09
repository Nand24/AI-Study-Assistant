import React, { useContext, useEffect, useRef, useState } from 'react'
import Logo from '../components/Logo'
import { IoIosArrowBack } from "react-icons/io";
import { FaFilePdf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PdfUploadBox from '../components/PdfUploadBox';
import axios from 'axios';
import PdfStudyDataContainer from '../components/PdfStudyDataContainer';
import { studyDataContext } from '../context/StudyContext';


const MainUploadPage = () => {

  const {studyData,setStudyData} = useContext(studyDataContext);

    const [loading , setLoading] = useState(false);
    const [load , setLoad] = useState(true);
    const [showPdfData , setShowPdfData] = useState(false);
    const [allPdfList , setAllPdfList] = useState([]);
    const [activeTab , setActiveTab] = useState('');
    const [pdfId , setPdfId] = useState(null);


    const navigate = useNavigate();

    const pageRouteHandler = () => {
        navigate('/dashboard');
    }

    const handleUpload = async (file) => {
  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("pdf", file); 
    const token = localStorage.getItem("token");
      if (!token) {
      console.error("No token found");
      return;
      }

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/ai/uploadPdfAndGenerate`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
           Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("PDF uploaded successfully:", response.data);
      setPdfId(response.data.pdfId);
       await getpdflist();
       await getStudyData(response.data.pdfId);
      setShowPdfData(true);
      alert("PDF uploaded successfully!");
      
    }
  } catch (err) {
    console.error("Error uploading file:", err);
    alert("Failed to upload the PDF. Please try again.");
  } finally {
    setLoading(false);
  }
    };

    const getpdflist = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
    try{
      
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/PdfList`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.status === 200) {
  console.log("Fetched PDF list:", response.data); // ✅ now this will work
  setAllPdfList(response.data);
} else {
  console.warn("Unexpected status:", response.status); // will only run if not 200
}

    }catch(err){
      console.log(err)
    }
    };

    const getStudyData = async (pdfId) => {
      const token = localStorage.getItem("token");
      if (!token) {
      console.error("No token found");
      return;
      }
      setShowPdfData(true);
      setLoad(false);
      try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/getPdfStudyData/${pdfId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
      setStudyData(response.data);
      }
      } catch (err) {
      console.log("Error fetching study data:", err);
      }finally{
        setLoad(true);
      }
    };

   useEffect(() => {
  getpdflist();
}, []);

  return (
    <div className='bg-gray-200 text-black w-screen h-screen flex'>
      <aside className='w-[20vw] h-full bg-white shadow-md py-4 px-3'>
        <div>
            <div className='w-full h-12 flex items-center justify-between  '>
            <Logo/> 
            </div>
            <div className='w-full flex items-center justify-center mt-8'>
            <button onClick={()=>{setShowPdfData(false);
                    setActiveTab('')
            }} className='cursor-pointer px-4 py-2 bg-black w-full text-white rounded-md text-sm font-semibold'>New Chat</button>
            </div>
            <h2 className='text-md text-zinc-700 mt-2.5'>Pdf History</h2>

            <div className='pdf-history w-full h-[63vh] mt-2 overflow-y-auto py-1 px-1.5'>
                
                {
                  allPdfList.length > 0 ? (
                    allPdfList.map((pdf , index)=>(
                      <div
                       key={index}
                        onClick={() => 
                        {
                          setActiveTab(pdf.title);
                          getStudyData(pdf._id); 
                          setPdfId(pdf._id);
                        }
                        }
                        className={`flex gap-3 items-center w-full hover:bg-gray-300 p-1 rounded-lg cursor-pointer
                          ${activeTab === pdf.title ? 'bg-gray-300': ''}
                          `}
                      >
                        <FaFilePdf className="text-blue-600" />
                        <span className="cursor-pointer text-sm text-zinc-700">
                        {pdf.title || 'Sample.pdf'}
                        </span>
                      </div>
                    ))
                  ): <p>No list yet</p>
                }

            </div>
            <div
             className='w-full flex items-center justify-center mt-5'>
                <button
                onClick={pageRouteHandler}
                 className='text-zinc-600 text-sm flex gap-2 items-center cursor-pointer hover:text-blue-600 transition-all duration-200'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-dashboard h-5 w-5"><rect width="8" height="10" x="3" y="3" rx="1"></rect><rect width="8" height="6" x="14" y="3" rx="1"></rect><rect width="8" height="10" x="14" y="12" rx="1"></rect><rect width="8" height="6" x="3" y="16" rx="1"></rect></svg>
                    Go to dashboard
                </button>
            </div>
        </div>
      </aside>
      <div className='w-[80vw] h-full pt-2 px-2'>
        {
          showPdfData ? <PdfStudyDataContainer pdfId={pdfId} load={load}/> : <PdfUploadBox onFileUpload={handleUpload} loading={loading}/>
        }
      </div>
    </div>
  )
}

export default MainUploadPage
