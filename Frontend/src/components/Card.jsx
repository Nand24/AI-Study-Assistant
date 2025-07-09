import React from 'react';
import {
  FaFilePdf,
  FaTimes,
  FaBullseye,
  FaRedo,
  FaQuestionCircle,
  FaPercent,
  FaCheck,
  FaQuestion
} from 'react-icons/fa';

// Icon map for dynamic access
const iconMap = {
  FaFilePdf: FaFilePdf,
  FaCheck: FaCheck,
  FaTimes: FaTimes,
  FaBullseye: FaBullseye,
  FaRedo: FaRedo,
  FaQuestionCircle: FaQuestionCircle,
  FaQuestion:FaQuestion,
  FaPercent:FaPercent,
};

const Card = ({ item }) => {
  const IconComponent = iconMap[item.icon] || FaQuestionCircle; // fallback if unknown icon

  return (
    <div className='bg-white shadow-lg rounded-lg p-4 m-4 w-[21vw] h-36 flex flex-col justify-between'>
      <div>
        <div className='flex justify-between items-center'>
          <h2 className='text-md'>{item.title}</h2>
          <span>
            <IconComponent className='text-blue-600 text-xl' />
          </span>
        </div>
        <h5 className='mt-8 text-xl font-semibold'>{item.number}</h5>
      </div>
      <span className='text-blue-500 text-sm'>View all chats</span>
    </div>
  );
};

export default Card;
