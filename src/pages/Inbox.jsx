import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Notification from '../components/Notification';

import { UserContext } from '../contexts/UserContext';

import '../styles/inbox.css';

function Inbox() {
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    document.title = "Blood Donation | Inbox";
  }, []);

  useEffect(() => {
    const askApi = async () => {
      const access_token = JSON.parse(localStorage.getItem('auth')).access_token ?? user.access_token;

      try {
        const { data } = await axios.get('/inbox', {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });
  
        setMessages(data);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    }

    askApi();
  }, []);
  
  return (
    <>
      <Navbar />
      <section id="inbox-showcase">
        <h1>صندوق الوارد</h1>
      </section>
      <section id="notifications">
        {!loading && messages.map((message) => (
          <Notification key={message.id} name={message.name} age={message.age} email={message.user.email} bloodType={message.blood_type} level={message.level} location={message.location} file={message.file} />
        ))}
      </section>
      <Footer />
    </>
  )
}

export default Inbox