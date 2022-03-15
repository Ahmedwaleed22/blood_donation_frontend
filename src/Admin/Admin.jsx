import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import '../styles/Admin/admin.css';

function Admin() {
  return (
    <div id="admin-page">
      <Navbar background="#f2f2f2" />
      <div className="page-container">  
        <nav id="admin-sidebar">
          <ul>
          <li>
              <NavLink end to="/admin" className={({ isActive }) => isActive ? 'active' : ''}>الصفحة الرئيسية</NavLink>
            </li>
            <li>
              <NavLink to="users" className={({ isActive }) => isActive ? 'active' : ''}>المستخدمين</NavLink>
            </li>
            <li>
              <NavLink to="criticalcases" className={({ isActive }) => isActive ? 'active' : ''}>الحالات الطارئة</NavLink>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Admin