import axios from 'axios';

export const isAuthenticated = async () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/api/verifyToken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if(response.status === 200){
      const data = await response.data;
      return data.valid === true;
    } else{
      return false;
    }
    
    

    
  } catch (err) {
    return false;
  }
};


export const loginUser = async (email, password) => {
    const loginData = { email, password };

    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, loginData);
        if (response.status === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, error: 'Unexpected response' };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error };
    }
};

export const registerUser = async (username, email, password) => {
    const registerData = { username, email, password };

    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/register`, registerData);
        if (response.status === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, error: 'Unexpected response' };
        }
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false, error };
    }
};