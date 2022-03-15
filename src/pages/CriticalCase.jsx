import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';

import Navbar from '../components/Navbar'
import Footer from '../components/Footer';

import { UserContext } from '../contexts/UserContext';

import '../styles/criticalCase.css';

function CriticalCase() {
  const { user } = useContext(UserContext);
  const [name, setName] = useState(undefined);
  const [age, setAge] = useState(undefined);
  const [bloodType, setBloodType] = useState(undefined);
  const [location, setLocation] = useState(undefined);
  const [level, setLevel] = useState(undefined);
  const [file, setFile] = useState(undefined);


  useEffect(() => {
    document.title = "Blood Donation | Register Critical Case";
  }, []);

  const submitForm = async (event) => {
    event.preventDefault();
    let formData = {};

    if (file) {
      formData = new FormData();
      formData.append("name", name);
      formData.append("age", age);
      formData.append("blood_type", bloodType);
      formData.append("location", location);
      formData.append("level", level);
      formData.append("file", file);
    } else {
      formData = {
        name: name,
        age: age,
        blood_type: bloodType,
        location: location,
        level: level
      };
    }

    try {
      const access_token = user.access_token;

      const askApi = await axios.post('/criticalcases', formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": file ? `multipart/form-data charset=utf-8; boundary=` + Math.random().toString().substr(2) : "application/json"
        }

      });
      
      if (askApi.status === 200) {
        alert("Critical Case Created Successfully! And We Notified The Volunteers With The Same Blood Type.");
      } else {
        alert("Couldn't Create Critical Case!");
      }
    } catch (e) {
      console.error(e);
      alert(e.response.data.error);
    }
  }

  return (
    <>
      <Navbar />
      <section id="critical-case-showcase">
        <h1>حالة طارئة</h1>
      </section>
      <section id="registration-form">
        <form onSubmit={submitForm}>
          <div className="form-container">
            <div className="form-group required">
              <label htmlFor="age">عمر الحالة</label>
              <input id="age" type="number" placeholder="عمر الحالة" onChange={event => setAge(event.target.value)} />
            </div>
            <div className="form-group required">
              <label htmlFor="name">اسم الحالة</label>
              <input id="name" type="text" placeholder="اسم الحالة" onChange={event => setName(event.target.value)} />
            </div>
            <div className="form-group required">
              <label htmlFor="location">محل الاقامة</label>
              <input id="location" type="text" placeholder="محل الاقامة" onChange={event => setLocation(event.target.value)} />
            </div>
            <div className="form-group required">
              <label htmlFor="bloodtype">فصيلة الدم</label>
              <select id="bloodtype" defaultValue="o-" onChange={event => setBloodType(event.target.value)}>
                <option value="o-">O-</option>
                <option value="o+">O+</option>
                <option value="B-">B-</option>
                <option value="B+">B+</option>
                <option value="A-">A-</option>
                <option value="A+">A+</option>
                <option value="AB-">AB-</option>
                <option value="AB+">AB+</option>
              </select>
            </div>
            <div className="form-group required">
              <label htmlFor="level">مستوى الخطورة</label>  
              <select id="level" defaultValue="normal" onChange={event => setLevel(event.target.value)}>
                <option value="critical">حرج</option>
                <option value="urgent">عاجل</option>
                <option value="normal">عادي</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="file">ملف المشكلة</label>
              <input type="file" id="file" onChange={event => setFile(event.target.files[0])} />
            </div>
          </div>
          <div className="actions">
            <button type="submit">تسجيل حالة طارئة</button>
          </div>
        </form>
      </section>
      <Footer />
    </>
  )
}

export default CriticalCase