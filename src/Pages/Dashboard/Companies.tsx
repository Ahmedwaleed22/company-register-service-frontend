// Packages
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';

// Components
import DashboardLayout from '../../Layouts/DashboardLayout'
import Button from '../../Components/Button'
import Loading from '../../Components/Loading';

// Store
import { RootState } from '../../Store';
import { useNavigate } from 'react-router-dom';

function Companies() {
  const token: any = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const askApi = async () => {
      try {
        const { data } = await axios.get('/companies', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCompanies(data.data);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    }

    askApi();
  }, [setCompanies, setIsLoading, token]);

  const packages = (event: any) => {
    navigate('/');
    setTimeout(() => {
      event.preventDefault();
      const section = document.getElementById('packages');
      section?.scrollIntoView();
    }, 10);
  }

  return (
    <DashboardLayout>
      <div className="dashboard-title-container">
        <h1>Companies</h1>
        <div className="actions">
          <Button onClick={packages} style="info">Create New</Button>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="table-container">
          <table className="dahsboard-table">
            <thead>
              <tr>
                <td>ID</td>
                <td>Incorporated</td>
                <td>Name</td>
                <td>Country</td>
                <td>Number</td>
                <td>Auth. Code</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {companies && companies.map((company: any, idx: number) => (
                <tr>
                  <td>{company.id}</td>
                  <td>{company.incorporated}</td>
                  <td>{company.name}</td>
                  <td>{company.country}</td>
                  <td>{company.number}</td>
                  <td>{company.auth_code}</td>
                  <td>{company.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  )
}

export default Companies