// Packages
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Components
import DashboardLayout from "../../Layouts/DashboardLayout";
import DetailsSection from "../../Components/Dashboard/DetailsSection";
import Button from "../../Components/Button";

// Styles
import "../../styles/Dashboard/MyDetails.scss";
import axios from "axios";

// Store
import { RootState } from "../../Store";
import Loading from "../../Components/Loading";

function MyDetails() {
  const token: any = useSelector((state: RootState) => state.auth.token);
  const [isLoading, setIsLoading] = useState(true);
  const [isCardsLoading, setIsCardsLoading] = useState(true);
  const [alert, setAlert] = useState<any>();

  // User Date
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [password, setPassword] = useState("");

  const [cards, setCards] = useState([]);
  const [card, setCard] = useState("new");

  useEffect(() => {
    const askApi = async () => {
      try {
        const { data } = await axios.get('/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const { first_name, last_name, email, whatsapp_number } = data.data;

        setFirstName(first_name);
        setLastName(last_name);
        setEmail(email);
        setWhatsappNumber(whatsapp_number);

        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    }

    askApi();
  }, []);

  useEffect(() => {
    const askApi = async () => {
      try {
        const { data } = await axios.get('/payments/cards', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setCards(data.data);
        console.log(data.data[0]['id'])
        setCard(data.data[0]['id']);
        setIsCardsLoading(false);
      } catch (e) {
        console.error(e);
      }
    }

    askApi();
  }, []);

  const handleUserDataChange = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await axios.put('/users', {
        first_name: firstName,
        last_name: lastName,
        email,
        whatsapp_number: whatsappNumber,
        password,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setAlert({
        type: "success",
        message: 'User Data Updated Successfully!'
      });
    } catch (e: any) {
      console.error(e);

      setAlert({
        type: "danger",
        message: e.response.data.message
      });
    }
    setIsLoading(false);
  };

  return (
    <DashboardLayout>
      <h1 className="dashboard-title">My Details</h1>
      <div className="details-container">
        <DetailsSection title="Account Holder">
          {isLoading ? (
            <Loading />
          ) : (
            <form onSubmit={handleUserDataChange}>
              {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
              <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input
                  value={firstName}
                  onChange={(event: any) => setFirstName(event.target.value)}
                  id="first_name"
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input
                  value={lastName}
                  onChange={(event: any) => setLastName(event.target.value)}
                  id="last_name"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  value={email}
                  onChange={(event: any) => setEmail(event.target.value)}
                  id="email"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="wanumber">Whatsapp Number</label>
                <input
                  value={whatsappNumber}
                  onChange={(event: any) => setWhatsappNumber(event.target.value)}
                  id="wanumber"
                  type="string"
                  placeholder="Whatsapp Number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  value={password}
                  onChange={(event: any) => setPassword(event.target.value)}
                  id="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="actions">
                <Button type="submit" style="primary">
                  Save
                </Button>
              </div>
            </form>
          )}
        </DetailsSection>
      </div>
    </DashboardLayout>
  );
}

export default MyDetails;
