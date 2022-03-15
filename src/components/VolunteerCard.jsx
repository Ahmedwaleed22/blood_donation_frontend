import React from 'react'
import { Link } from 'react-router-dom';

import '../styles/volunteerCard.css';

function VolunteerCard({ volunteerName, bloodType, age, location, phoneNumber, email }) {
  return (
    <div className="volunteer-card">
      <h1 className="volunteer-name">{volunteerName}</h1>
      <ul>
        <li>{bloodType} :<span>فصيلة الدم</span></li>
        <li>{age} :<span>العمر</span></li>
        <li>{location} :<span>محل الاقامة</span></li>
      </ul>
      <h2>معلومات التواصل</h2>
      <ul>
        <li><span>رقم الهاتف</span>: {phoneNumber}</li>
        <li>{email} :<span>البريد الالكتروني</span></li>
      </ul>
    </div>
  )
}

export default VolunteerCard