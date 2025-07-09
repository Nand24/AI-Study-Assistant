import React, { createContext, useState } from 'react'

export const studyDataContext = createContext();

const StudyContext = ({children}) => {

    const [studyData , setStudyData] = useState({});

  return (
    <studyDataContext.Provider value={{studyData , setStudyData}}>
        {children}
    </studyDataContext.Provider>
  )
}

export default StudyContext
