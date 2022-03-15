import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../styles/Admin/home.css';

function AdminHome() {
  useEffect(() => {
    document.title = "Blood Donation | Admin Panel";
  }, []);

  return (
    <div id="admin-home-page">
      <h1 className="admin-page-title">الصفحة الرئيسية</h1>
      <section className="admin-page-container">
        <Link to="users">
          <div className="card">
            <h2>ادارة المستخدمين</h2>
            <p>يمكن ادارة حسابات المستخدمين من هنا </p>
          </div>
        </Link>
        <Link to="criticalcases">          
          <div className="card">
            <h2>الحالات الطارئة</h2>
            <p>يمكن ادارة الحالات الطارئة من هنا من حيث الانشاء او التعديل او الحذف</p>
          </div>
        </Link>
      </section>
    </div>
  )
}

export default AdminHome