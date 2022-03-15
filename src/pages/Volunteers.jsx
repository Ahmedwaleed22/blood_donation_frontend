import React, { useEffect, useState } from 'react'
import axios from 'axios';

import Navbar from '../components/Navbar';
import VolunteerCard from '../components/VolunteerCard';
import VolunteersContainer from '../components/VolunteersContainer';
import Footer from '../components/Footer';

import '../styles/volunteers.css';

function Volunteers() {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    document.title = "Blood Donation | Volunteers";
  }, []);

  useEffect(() => {
    const askApi = async () => {
      try {
        const { data } = await axios.get('/volunteers');

        setVolunteers(data);
      } catch (e) {
        console.error(e);
      }
    }

    askApi();
  }, []);

  return (
    <>
      <Navbar />
      <section id="volunteers-showcase">
        <h1>حياه <span className="primary-color">الجميع</span> تهمنا</h1>
      </section>
      <section id="volunteers">
        <VolunteersContainer>
          {volunteers.map((volunteer) => (
            <VolunteerCard key={volunteer.id} volunteerName={volunteer.user.full_name} bloodType={volunteer.blood_type} age={volunteer.age} location={volunteer.location} phoneNumber={volunteer.phone_number} email={volunteer.user.email} />
          ))}
        </VolunteersContainer>
      </section>
      <Footer />
    </>
  )
}

export default Volunteers