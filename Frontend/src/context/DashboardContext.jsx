import React, { createContext, useState } from 'react'

export const userDashboardContext = createContext();

const DashboardContext = ({children}) => {

    const [dashboardData , setDashboardData] = useState([]);

  return (
    <userDashboardContext.Provider value={{dashboardData , setDashboardData}}>
        {children}
    </userDashboardContext.Provider>
  )
}

export default DashboardContext
