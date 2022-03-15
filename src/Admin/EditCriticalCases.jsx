import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import '../styles/Admin/editCriticalCases.css';

function EditCriticalCases() {
  const { id } = useParams();
  const [criticalCase, setCriticalCase] = useState([]);
  const [name, setName] = useState(undefined);
  const [age, setAge] = useState(undefined);
  const [bloodType, setBloodType] = useState(undefined);
  const [location, setLocation] = useState(undefined);
  const [level, setLevel] = useState(undefined);
  const [file, setFile] = useState(undefined);
  const access_token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).access_token : "";

  useEffect(() => {
    document.title = "Blood Donation | Edit Critical Case";
  }, []);

  useEffect(() => {
    const askApi = async () => {
      try {
        const { data } = await axios.get(`/admin/criticalcases/${id}`, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });
  
        setCriticalCase(data);
        setName(data.name);
        setAge(data.age);
        setBloodType(data.blood_type);
        setLocation(data.location);
        setLevel(data.level);
      } catch (e) {
        console.error(e);
      }
    }

    askApi();
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
      formData.append("_method", "patch");
    } else {
      formData = {
        name: name,
        age: age,
        blood_type: bloodType,
        location: location,
        level: level,
        _method: "patch"
      };
    }

    try {
      const askApi = await axios.post(`/admin/criticalcases/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": file ? `multipart/form-data charset=utf-8; boundary=` + Math.random().toString().substr(2) : "application/json"
        }

      });
      
      console.log(askApi);

      if (askApi.status === 200) {
        alert("Critical Case Updated Successfully! And We Notified The Volunteers With The Same Blood Type.");
      } else {
        alert("Couldn't Create Critical Case!");
      }
    } catch (e) {
      console.error(e);
      alert(e.response.data.error);
      console.log(e.response.data)
    }
  }

  return (
    <div id="edit-critical-case-page">
      <h1 className="admin-page-title">تعديل الحالة</h1>
      <section id="registration-form">
        <form onSubmit={submitForm}>
          <div className="form-container">
            <div className="form-group required">
              <label htmlFor="name">اسم الحالة</label>
              <input id="name" type="text" placeholder="اسم الحالة" value={name} onChange={event => setName(event.target.value)} />
            </div>
            <div className="form-group required">
              <label htmlFor="age">عمر الحالة</label>
              <input id="age" type="number" placeholder="عمر الحالة" value={age} onChange={event => setAge(event.target.value)} />
            </div>
            <div className="form-group required">
              <label htmlFor="location">محل الاقامة</label>
              <input id="location" type="text" placeholder="محل الاقامة" value={location} onChange={event => setLocation(event.target.value)} />
            </div>
            <div className="form-group required">
              <label htmlFor="bloodtype">فصيلة الدم</label>
              <select id="bloodtype" defaultValue={bloodType} onChange={event => setBloodType(event.target.value)}>
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
              <select id="level" defaultValue={level} onChange={event => setLevel(event.target.value)}>
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
            <button type="submit">تعديل</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default EditCriticalCases