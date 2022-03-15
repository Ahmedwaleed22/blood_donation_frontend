import React, { useEffect, useState } from 'react'
import axios from 'axios';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import '../styles/contactUs.css';

function ContactUs() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.title = "Blood Donation | Contact Us";
  }, []);

  const submitForm = async (event) => {
    event.preventDefault();
    const formData = {
      full_name: fullName,
      email: email,
      message: message
    }

    try {
      const askApi = await axios.post('/contact/send', formData);

      if (askApi.status === 200) {
        alert('Message Sent Successfully!');
      } else {
        alert('Couldn\'t Send Message :(');
      }
    } catch (e) {
      console.error(e);
      alert('Couldn\'t Send Message :(');
    }
    
  }

  return (
    <>
      <Navbar />
      <section id="contact_showcase">
        <h1>نحب ان نسمع رايك و مقتراحاتك</h1>
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
            <label htmlFor="message">رسالتك</label>
            <textarea id="message" cols="30" rows="10" placeholder="رسالتك" onChange={event => setMessage(event.target.value)}></textarea>
          </div>
          <button>ارسل</button>
        </form>
      </section>
      <Footer />
    </>
  )
}

export default ContactUs