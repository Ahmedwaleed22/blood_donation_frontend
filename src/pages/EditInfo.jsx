import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import { UserContext } from '../contexts/UserContext';

import '../styles/editInfo.css';

function EditInfo() {
  const { user } = useContext(UserContext);
  const [fullName, setFullName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  useEffect(() => {
    document.title = "Blood Donation | Edit Info";
  }, []);
 
  const submitForm = async (event) => {
    event.preventDefault();
    const formData = {
      ...(fullName && {full_name: fullName}),
      ...(email && {email: email}),
      ...(password && {password: password})
    }

    if (fullName !== undefined || email !== undefined || password !== undefined) {
      try {
        const access_token = user.access_token;
  
        const askApi = await axios.patch('/user', formData, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });
  
        if (askApi.status === 200) {
          alert("Your Info Edited Successfully!");
        } else {
          alert("Error Occurred!");
        }
      } catch (e) {
        alert("Error Occurred!");
        console.error(e);
      }
    } else {
      alert("All Fields Cannot Be Empty!");
    }

  }

  return (
    <>
      <Navbar />
      <section id="edit_info_showcase">
        <h1>تعديل بياناتك</h1>
      </section>
      <section className="contact-form">
        <form onSubmit={submitForm}>
          <div className="form-group">
            <label htmlFor="full-name">الاسم بالكامل</label>
            <input type="text" id="full-name" placeholder="الاسم بالكامل" onChange={event => setFullName(event.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="email">البريد الالكتروني</label>
            <input type="text" id="email" placeholder="البريد الالكتروني" onChange={event => setEmail(event.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">كلمة السر</label>
            <input type="password" id="password" placeholder="كلمة السر" onChange={event => setPassword(event.target.value)} />
          </div>
          <div className="editinfo-actions">
            <button type="submit">تعديل</button>
            <button type="button">حذف الحساب</button>
          </div>
        </form>
      </section>
      <Footer />
    </>
  )
}

export default EditInfo