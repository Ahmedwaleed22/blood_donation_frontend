import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ManageCriticalCases() {
  const [criticalCases, setCriticalCases] = useState([]);
  const navigation = useNavigate();
  const access_token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).access_token : "";

  useEffect(() => {
    document.title = "Blood Donation | Manage Critical Cases";
  }, []);

  const toEditPage = (id) => navigation(`edit/${id}`);

  useEffect(() => {
    const askApi = async () => {

      const { data } = await axios.get('/admin/criticalcases', {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      setCriticalCases(data);
    }

    askApi();
  }, []);

  const deleteCriticalCase = async (id) => {
    await axios.delete(`/admin/criticalcases/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    setCriticalCases(criticalCases.filter(criticalCase => criticalCase.id != id));
  }

  return (
    <div id="manage-users-page">
      <h1 className="admin-page-title">الحالات الطارئة</h1>
      <div className="manage-users-container">
        <table>
          <thead>
            <th>اسم الحالة</th>
            <th>عمر الحالة</th>
            <th>البريد الالكروني</th>
            <th>الاجرائات</th>
          </thead>
          <tbody>
            {criticalCases.map((criticalCase) => (
              <tr key={criticalCase.id}>
                <td>{criticalCase.name}</td>
                <td>{criticalCase.age}</td>
                <td>{criticalCase.user.email}</td>
                <td className="actions"><button onClick={() => deleteCriticalCase(criticalCase.id)} className="delete">حذف</button> <button onClick={() => toEditPage(criticalCase.id)} className="edit">تعديل</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageCriticalCases