import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

import Navbar from '../components/Navbar';

import aboutImage from '../img/about_image.jpeg';

import '../styles/home.css';

function Home() {
  useEffect(() => {
    document.title = "Blood Donation | Homepage";
  }, []);

  return (
    <>
      <Navbar />
      <section id="showcase">
        <div className="text">
          <h1 className="title">التبرع <span className="primary-color">بالدم</span></h1>
          <p className="description">.حياتك تهمنا</p>
        </div>
        <div className="actions">
          <Link to="/register-new-volunteer">التسجيل كمتطوع</Link>
        </div>
      </section>
      <section id="about">
        <h1 className="section-title"><span className="primary-color">نبذة</span> عنا</h1>
        <div className="container">
          <div className="text">
            <p>.نساهم في انقاذ حياة الجميع</p>
            <p>يمكن للجميع ان يتبرعوا بالدم من خلال موقعنا عن طريق التسجيل من <Link to="/register-new-volunteer">هنا</Link></p>
            <p>.يمكن ان تجد الالف هنا لمساعدك</p>
            <p>يمكنك ان تسجل حالة طارقة من <Link to="/register-new-critical-case">هنا</Link></p>
          </div>
          <div className="image">
            <img src={aboutImage} alt="About Image" />  
          </div>
        </div>
      </section>
      <section id="howitworks">
        <h1 className="section-title">كيف تعمل <span className="primary-color">خداماتنا</span></h1>
        <div className="container">
          <div className="card">
            <h1 className="card-title">المتبرع</h1>
            <p>.يمكن للمتبرع ان يقوم بتسجيل حساب و ادخال فصيلة دمه و محل اقامته و معلومات صحية عنه</p>
            <Link to="/register-new-volunteer">تسجيل</Link>
          </div>
          <div className="card">
            <h1 className="card-title">الحالات الطارئة</h1>
            <p>.يانات لنوع الدم المطلوب و بعض المعلومات التي قد نحتاجها نحن لتوفير لك ما تحتاج</p>
            <Link to="/register-new-critical-case">تسجيل</Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Home