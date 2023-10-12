// Packages
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';

// Components
import DashboardLayout from '../../Layouts/DashboardLayout'
import Button from '../../Components/Button'

// Store
import { RootState } from '../../Store';
import Loading from '../../Components/Loading';

function Invoices() {
  const token: any = useSelector((state: RootState) => state.auth.token);
  const [isLoading, setIsLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const askApi = async () => {
      try {
        const { data } = await axios.get('/orders/invoices', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setInvoices(data.data);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    }

    askApi();
  }, [setInvoices, setIsLoading, token]);

  return (
    <DashboardLayout>
      <h1 className="dashboard-title">Invoices</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="table-container">
          <table className="dahsboard-table">
            <thead>
              <tr>
                <td>ID</td>
                <td>Invoiced</td>
                <td>Status</td>
                <td>Company</td>
                <td>Description</td>
                <td>Price</td>
              </tr>
            </thead>
            <tbody>
              {invoices && invoices.map((invoice: any, idx: number) => (
                <tr>
                  <td>{invoice.id}</td>
                  <td>{invoice.invoice}</td>
                  <td>{invoice.status}</td>
                  <td>{invoice.company.name}</td>
                  <td>{invoice.description}</td>
                  <td>{invoice.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  )
}

export default Invoices