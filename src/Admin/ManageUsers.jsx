import React, { useEffect, useState } from 'react'
import axios from 'axios';

import '../styles/Admin/manageUsers.css';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const access_token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).access_token : "";

  useEffect(() => {
    document.title = "Blood Donation | Manage Users";
  }, []);

  useEffect(() => {
    const askApi = async () => {

      const { data } = await axios.get('/admin/users', {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      setUsers(data);
    }

    askApi();
  }, []);

  const deleteUser = async (id) => {
    await axios.delete(`/admin/users/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    setUsers(users.filter(user => user.id != id));
  }

  return (
    <div id="manage-users-page">
      <h1 className="admin-page-title">ادارة المستخدمين</h1>
      <div className="manage-users-container">
        <table>
          <thead>
            <th>رقم العضوية</th>
            <th>اسم المستخدم</th>
            <th>البريد الالكروني</th>
            <th>الاجرائات</th>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.full_name}</td>
                <td>{user.email}</td>
                <td><button onClick={() => deleteUser(user.id)} className="delete">حذف</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageUsers