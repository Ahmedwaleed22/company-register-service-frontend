// Packages
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

// Components
import Button from "../../Components/Button";
import DashboardLayout from "../../Layouts/DashboardLayout";

// Styles
import "../../styles/Dashboard/Mail.scss";

// Store
import { RootState } from "../../Store";
import Loading from "../../Components/Loading";

function Mail() {
  const token: any = useSelector((state: RootState) => state.auth.token);
  const [isLoading, setIsLoading] = useState(true);
  const [mail, setMail] = useState([]);

  useEffect(() => {
    const askApi = async () => {
      try {
        const { data } = await axios.get("/mail", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMail(data.data);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    askApi();
  }, [setMail, setIsLoading, token]);

  return (
    <DashboardLayout>
      <h1 className="dashboard-title">My Mail</h1>
      {isLoading ? (
        <Loading />
      ) : (
        mail.map((order: any, idx: number) => (
          <>
            <h2 className="company-name">{order && order.company}</h2>
            <div className="table-container">
              <table className="dahsboard-table">
                <thead>
                  <tr>
                    <td>Name</td>
                    <td>Description</td>
                    <td>Date</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {order && order.files.map((file: any, idx: number) => (
                    <tr key={idx}>
                      <td>{file.name}</td>
                      <td>{file.description}</td>
                      <td>{file.uploaded_date}</td>
                      <td>
                        <Button onClick={() => window.open(file.link, '_self')} style="info">Download</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ))
      )}
    </DashboardLayout>
  );
}

export default Mail;
