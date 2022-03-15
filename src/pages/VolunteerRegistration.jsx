import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';

import Navbar from '../components/Navbar'
import Footer from '../components/Footer';

import { UserContext } from '../contexts/UserContext';

import '../styles/VolunteerRegistration.css';

function VolunteerRegistration() {
  const { user } = useContext(UserContext);

  const [name, setName] = useState(undefined);
  const [age, setAge] = useState(undefined);
  const [phoneNumber, setPhoneNumber] = useState(undefined);
  const [location, setLocation] = useState(undefined);
  const [bloodType, setBloodType] = useState('O-');
  const [smoking, setSmoking] = useState(false);
  const [healthCondition, setHealthCondition] = useState('Very Good');
  const [healthProblems, setHealthProblems] = useState(undefined);

  useEffect(() => {
    document.title = "Blood Donation | Register As Volunteer";
  }, []);

  const submitForm = async (event) => {
    event.preventDefault();
    
    const formData = {
      name: name,
      age: age,
      blood_type: bloodType,
      location: location,
      phone_number: phoneNumber,
      is_smoking: smoking === "yes" ? true : false,
      health_condition: healthCondition,
      health_problems: healthProblems
    }

    try {
      const access_token = user.access_token;

      const askApi = await axios.post('/volunteers', formData, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      console.log(askApi);
      if (askApi.status === 200) {
        alert("Sucessfully Registerd As A Volunteer");
      } else {
        alert("An Error Occurred");
      }
    } catch (e) {
      console.error(e);
      alert(e.response.data.error);
    }
  }

  return (
    <>
      <Navbar />
      <section id="volunteer-register-showcase">
        <h1>تسجيل كمتطوع</h1>
      </section>
      <section id="registration-form">
        <form onSubmit={submitForm}>
          <div className="form-container">
            <div className="form-group required">
              <label htmlFor="age">عمر المتطوع</label>
              <input id="age" type="number" placeholder="عمر المتطوع" onChange={event => setAge(event.target.value)} />
            </div>
            <div className="form-group required">
              <label htmlFor="name">اسم المتطوع</label>
              <input id="name" type="text" placeholder="اسم المتطوع" onChange={event => setName(event.target.value)} />
            </div>
            <div className="form-group required">
              <label htmlFor="phonenumber">رقم الهاتف</label>
              <input id="phonenumber" type="text" placeholder="رقم الهاتف" onChange={event => setPhoneNumber(event.target.value)} />
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
              <label htmlFor="smoking">هل تدخن؟</label>  
              <select id="smoking" defaultValue="no" onChange={event => setSmoking(event.target.value)}>
                <option value="yes">نعم</option>
                <option value="no">لا</option>
              </select>
            </div>
            <div className="form-group required">
              <label htmlFor="healthcondition">الحالة الصحية</label>  
              <select id="healthcondition" defaultValue="4" onChange={event => setHealthCondition(event.target.value)}>
                <option value="Very Good">ممتاز</option>
                <option value="Good">جيد</option>
                <option value="Medium">متوسط</option>
                <option value="Bad">سئ</option>
              </select>
            </div>
            <div className="form-group required">
              <label htmlFor="issues">هل يوجد اي مشاكل صحية؟</label>
              <textarea id="issues" placeholder="هل يوجد اي مشاكل صحية؟" onChange={event => setHealthProblems(event.target.value)}></textarea>
            </div>
          </div>
          <div className="actions">
            <button type="submit">تسجيل كمتطوع</button>
          </div>
        </form>
      </section>
      <Footer />
    </>
  )
}

export default VolunteerRegistration