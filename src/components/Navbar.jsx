import React, { useState, useEffect, useLayoutEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { BsList } from 'react-icons/bs';

import '../styles/navbar.css';
import { UserContext } from '../contexts/UserContext';

function Navbar({ background = "#fff" }) {
  const { user, setUser } = useContext(UserContext);
  const [opened, setOpened] = useState(false);
  const navbarRef = useRef(null);
  let initialMount = useRef(true);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }
  }, []);
  
  useLayoutEffect(() => {
    if (!initialMount.current) {
      if (opened) {
        navbarRef.current.classList.remove('closed');
        navbarRef.current.classList.add('opened');
      } else {
        navbarRef.current.classList.remove('opened');
        navbarRef.current.classList.add('closed');
      }
    }
  }, [opened]);

  const logout = async () => {
    const access_token = user.access_token;

    try {
      await axios.post('/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      setUser();
    } catch (e) {
      console.error(e);
    }
    
    localStorage.removeItem('auth');
  }

  return (
    <nav id="navbar" ref={navbarRef} style={{ background: background }}>
      <h1 className="navbar-title"><span className="primary-color">Blood</span> Donation</h1>
      <ul className="navbar-links">
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
          <li>الصفحة الرئيسية</li>
        </NavLink>
        <NavLink to="/volunteers" className={({ isActive }) => isActive ? 'active' : ''}>
          <li>المتطوعين</li>
        </NavLink>
        {user?.access_token && (
          <>
          <NavLink to="/register-new-volunteer" className={({ isActive }) => isActive ? 'active' : ''}>
            <li>التسجيل كمتطوع</li>
          </NavLink>
          <NavLink to="/register-new-critical-case" className={({ isActive }) => isActive ? 'active' : ''}>
            <li>الحالات الطارئة</li>
          </NavLink>
            <NavLink to="/inbox" className={({ isActive }) => isActive ? 'active' : ''}>
              <li>صندوق الوارد</li>
            </NavLink>
            <NavLink to="/editinfo" className={({ isActive }) => isActive ? 'active' : ''}>
              <li>تعديل البيانات</li>
            </NavLink>
          </>
        )}
        <NavLink to="/contactus" className={({ isActive }) => isActive ? 'active' : ''}>
          <li>تواصل معنا</li>
        </NavLink>
        {!user?.access_token ? (
          <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>
            <li>تسجيل دخول</li>
          </NavLink>
        ): (
          <div className="navlink" onClick={logout}><li>تسجيل خروج</li></div>
        )}
      </ul>
      <div className="burger-icon" onClick={() => setOpened(!opened)}>
        <BsList />
      </div>
    </nav>
  )
}

export default Navbar