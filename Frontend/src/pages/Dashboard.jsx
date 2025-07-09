import React, { useContext, useEffect, useState } from 'react'
import Logo from '../components/Logo'
import Card from '../components/Card'
import { FaChartBar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userDataContext } from '../context/UserContext';
import { userDashboardContext } from '../context/DashboardContext';
import { FaChevronDown } from "react-icons/fa";

const Dashboard = () => {

  const {userData , setUserData} = useContext(userDataContext);
  const {dashboardData , setDashboardData} = useContext(userDashboardContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);


  const navigate = useNavigate();

  const pageRouteHandler = () => {
    navigate('/chat-pdf');
  }

  const handleLogout = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.removeItem("token");
    navigate("/");

  } catch (err) {
    console.error("Logout failed", err);
  }
};

  useEffect(() => {
  const getProfileAndDashboard = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      // Get Profile
      const profileResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/getUserProfile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (profileResponse.status === 200) {
        setUserData(profileResponse.data);
      }

      // Get Dashboard Data
      const dashboardResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/getDashboard`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (dashboardResponse.status === 200) {
        const data = dashboardResponse.data;

        setDashboardData([
          data.pdf,
          data.pdfAttempted,
          data.accuracy,
          data.totalQuestionAttempted,
          data.totalQuestionCorrect,
          data.wrong,
        ]);

      }

    } catch (err) {
      console.error("Error fetching profile/dashboard:", err);
    }
  };

  getProfileAndDashboard();

}, []);

  return (
    <div className='bg-gray-100 text-black w-screen h-screen overflow-x-hidden'>
      <nav
              className="w-full py-2 px-5 md:px-10 flex justify-between items-center shadow-md sticky top-0 bg-white z-50"
            >
              <Logo/>
              <div className='relative'>
  <div
    onClick={() => setDropdownOpen(prev => !prev)}
    className='bg-zinc-200 text-md rounded-4xl px-3 py-1.5 flex gap-1 cursor-pointer select-none'
  >
    <div className='w-full flex items-center gap-2 text-sm'>
      <span className='bg-blue-600 text-sm h-7 w-7 rounded-full text-white flex items-center justify-center'>
        {userData?.username?.charAt(0)}
      </span>
      {userData?.username}
      <FaChevronDown className="text-xs" />
    </div>
  </div>

  {dropdownOpen && (
    <div className="absolute right-0 mt-1 w-32 bg-white border border-zinc-400 rounded shadow z-10">
      <button
        onClick={handleLogout}
        className="w-full px-4 py-2 text-left text-sm text-zinc-800 font-semibold cursor-pointer hover:bg-gray-100"
      >
        Logout
      </button>
    </div>
  )}
</div>

      </nav>
      <div className='w-full flex justify-center items-center pt-9 gap-3'>
        <FaChartBar className="text-purple-600 text-xl" />
        <h1 className='text-xl font-bold '>Dashboard</h1>
      </div>
      <div className='w-full flex justify-center items-center flex-wrap gap-8 px-6 py-4'>
        {Array.isArray(dashboardData) && dashboardData.map((item, index) => (
  <Card key={index} item={item} />
))}
      </div>
      <div className='w-full flex justify-center items-center py-5 flex-col gap-3'>
        <p className='text-zinc-600 text-sm'>Upload a new pdf to get your Summary, Quizz, True/False, Question/Answer</p>
        <button
          onClick={pageRouteHandler} 
        className='px-5 py-2 rounded-4xl bg-blue-600 cursor-pointer text-white hover:bg-blue-700 text-md '>Upload new pdf</button>
      </div>
    </div>
  )
}

export default Dashboard
