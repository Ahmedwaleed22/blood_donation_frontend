import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function AdminRoute({Component}) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  let access_token = JSON.parse(localStorage.getItem('auth')) ? JSON.parse(localStorage.getItem('auth')).access_token : "";

  const askApi = async () => {
    const request = await axios.get('/admin/checkadmin', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    if (request.status === 200) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    
    setLoading(false);
  }

  useEffect(() => {
    const unsubscribe = askApi();
    return unsubscribe;
  }, [])

  if (!loading) {
    return loggedIn ? <Component /> : <Navigate to="/login" />;
  } else {
    return "";
  }
}

export default AdminRoute