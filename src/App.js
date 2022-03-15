import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Home from './pages/Home';
import Volunteers from './pages/Volunteers';
import VolunteerRegistration from './pages/VolunteerRegistration';
import CriticalCase from './pages/CriticalCase';
import ContactUs from './pages/ContactUs';
import Authentication from './pages/Authentication';
import Admin from './Admin/Admin';
import ManageUsers from './Admin/ManageUsers';
import ManageCriticalCases from './Admin/ManageCriticalCases';
import AdminHome from './Admin/AdminHome';
import EditCriticalCases from './Admin/EditCriticalCases';
import Inbox from './pages/Inbox';
import EditInfo from './pages/EditInfo';

import { UserContext } from './contexts/UserContext';
import ProtectedRoute from './components/ProtectedRoute';

axios.defaults.baseURL = 'http://localhost:8000/api';

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const auth = localStorage.getItem('auth');

    setUser(JSON.parse(auth));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/volunteers" element={<Volunteers />} />
          <Route path="/register-new-volunteer" element={<ProtectedRoute Component={VolunteerRegistration} />} />
          <Route path="/register-new-critical-case" element={<ProtectedRoute Component={CriticalCase} />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/login" element={<Authentication />} />
          <Route path="/inbox" element={<ProtectedRoute Component={Inbox} />} />
          <Route path="/editinfo" element={<ProtectedRoute Component={EditInfo} />} />
          <Route path="/admin" element={<ProtectedRoute Component={Admin} />}>
            <Route path="" element={<AdminHome />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="criticalcases" element={<ManageCriticalCases />} />
            <Route path="criticalcases/edit/:id" element={<EditCriticalCases />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
