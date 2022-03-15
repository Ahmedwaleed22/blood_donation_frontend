import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '../contexts/UserContext';

import '../styles/authentication.css';

function Authentication() {
  const [page, setPage] = useState('LOGIN');
  const { setUser } = useContext(UserContext);

  const navigation = useNavigate();

  // Form Data
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.title = "Blood Donation | Login or Register";
  }, []);

  const submitForm = async (event) => {
    event.preventDefault();
    let formData = {};

    if (page === 'LOGIN') {
      formData = {
        email: email,
        password: password
      }
    } else {
      formData = {
        full_name: fullName,
        email: email,
        password: password
      }
    }

    try {
      const apiCall = await axios.post(`${page === "LOGIN" ? "/auth/login" : "/auth/register"}`, formData);
  
      if (apiCall.status == 200 && page === 'LOGIN') {
        setUser(apiCall.data);
        localStorage.setItem('auth', JSON.stringify(apiCall.data));
        navigation('/');
      }
  
      if (apiCall.status == 200 && page === 'REGISTER') {
        const loginApiCall = await axios.post('/auth/login', {
          email: email,
          password: password
        });
  
        if (loginApiCall.status == 200) {
          setUser(loginApiCall.data);
          localStorage.setItem('auth', JSON.stringify(apiCall.data));
          navigation('/');
        }
      }
    } catch (e) {
      console.error(e);
      alert(e.response.data.error)
    }
  }

  return (
    <div id="login-page">
      <div className="login-form-container">
        <div className="main-actions">
          <span onClick={() => setPage("LOGIN")} className={`link ${page === "LOGIN" ? "active" : ""}`}>تسجيل دخول</span>
          <span className="seperator">|</span>
          <span onClick={() => setPage("REGISTER")} className={`link ${page === "REGISTER" ? "active" : ""}`}>انشاء حساب</span>
        </div>
        <div className="form-container">
          <form onSubmit={submitForm}>
            {page === "REGISTER" && (
              <div className="form-group">
                <label htmlFor="fullname">الاسم بالكامل</label>
                <input type="text" id="fullname" placeholder="الاسم بالكامل" onChange={event => setFullName(event.target.value)} />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email">البريد الالكتروني</label>
              <input type="text" id="email" placeholder="البريد الالكتروني" onChange={event => setEmail(event.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="password">كلمة المرور</label>
              <input type="password" id="password" placeholder="كلمة المرور" onChange={event => setPassword(event.target.value)} />
            </div>
            <button type="submit" className="submit-form-button">{ page === "LOGIN" && "تسجيل دخول" }{ page === "REGISTER" && "انشاء حساب" }</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Authentication