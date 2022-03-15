import React from "react";

function Notification({ name, age, email, bloodType, level, location, file }) {
  return (
    <div className="notification">
      <i className="icon">!</i>
      <div className="details">
        <ul>
          <li>
            <span className="title">الاسم</span>
            <span className="value">{ name }</span>
          </li>
          <li>
            <span className="title">العمر</span>
            <span className="value">{ age }</span>
          </li>
          <li>
            <span className="title">البريد الالكتروني</span>
            <span className="value">{ email }</span>
          </li>
          <li>
            <span className="title">فصيلة الدم</span>
            <span className="value">{ bloodType }</span>
          </li>
          <li>
            <span className="title">مستوى الخطورة</span>
            <span className="value">{ level }</span>
          </li>
          <li>
            <span className="title">محل الاقامة</span>
            <span className="value">{ location }</span>
          </li>
          {file !== null && (
            <li>
              <span className="title">ملف المشكلة</span>
              <span className="value"><a href={ file }>{ file }</a></span>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Notification;