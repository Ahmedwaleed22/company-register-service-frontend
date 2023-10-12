// Packages
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

// Components
import Button from "../../../Components/Button";
import PersonalInfromationForm from "./Components/PersonalInformation";
import FormActions from "./Uk/FormActions";
import CheckoutForm from "./Components/CheckoutForm";
import Loading from "../../../Components/Loading";

// Data
import { states, activities } from "../data/canada";

// Static
import CollaboratorsImage from "../../../Images/collaborators.png";
import Avatar from "../../../Images/avatar.svg";

// Styles
import { BsFillCreditCard2FrontFill, TbCash } from "../../../Config/icons";
import "../../../styles/Forms/UkForm.scss";

// Store
import { setAuth } from "../../../Store/authSlice";

interface Props {
  page: number;
  setPage: any;
}

function CanadaForm({ page, setPage }: Props) {
  // API Connection
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [orderID, setOrderID] = useState<any>();
  const [selectedAddons, setSelectedAddons] = useState<any>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { country, package: companyPackage } = useParams();

  // Global Variables
  const [payment, setPayment] = useState(false);

  // Comapny Infromation
  const [companyName, setCompanyName] = useState("");
  const [companyActivities, setCompanyActivities] = useState<any>([]);
  const [state, setState] = useState<any>({
    value: "Ontario",
    label: "Ontario"
  });
  const [addonStates, setAddonStates] = useState<boolean[]>([]);
  const [addons, setAddons] = useState<any>();
  const [selectedAddonNames, setSelectedAddonNames] = useState<string[]>([]);

  // Order Details
  const [appliedPromoCode, setAppliedPromoCode] = useState("");
  const [initialPrice, setInitialPrice] = useState<any>();
  const [totalPrice, setTotalPrice] = useState<any>();

  useEffect(() => {
    const askApi = async () => {
      try {
        const { data } = await axios.get("/companies/addons");
        setAddons(data.data);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    askApi();
  }, [setAddons]);

  const handleAddonButtonClick = (index: number) => {
    setAddonStates((prevStates) => {
      const newState = [...prevStates];
      newState[index] = !newState[index];
      return newState;
    });

    setSelectedAddonNames((prevNames: any) => {
      const addonName = addons[index].name;
      if (prevNames.includes(addonName)) {
        return prevNames.filter((name: any) => name !== addonName);
      } else {
        return [...prevNames, addonName];
      }
    });
  };

  // Personal Infromation
  const [personalInfromation, setPersonalInfromation] = useState<any>({
    first_name: "",
    last_name: "",
    nationality: "",
    country: "",
    city: "",
    address: "",
    whatsapp_number: "",
    email: "",
    dob: "",
    share_holds: "100",
    passport: "",
    password: ""
  });

  // Partners
  const [havePartners, setHavePartners] = useState(false);
  const [partnersNumber, setPartnersNumber] = useState(0);

  const [partnersDetails, setPartnersDetails] = useState<any>([]);

  const handlePartnersYesButton = () => {
    setHavePartners(true);
    setPartnersNumber(1);

    setPartnersDetails([
      {
        first_name: "",
        last_name: "",
        nationality: "",
        country: "",
        city: "",
        address: "",
        whatsapp_number: "",
        email: "",
        dob: "",
        share_holds: "",
        passport: ""
      }
    ]);
  };

  const handlePartnersNumberChange = (event: any) => {
    const newPartnersNumber = event.target.value;
    if (newPartnersNumber > 6 || newPartnersNumber < 1) {
      event.preventDefault();
      return;
    }

    if (partnersNumber > newPartnersNumber) {
      setPartnersDetails(partnersDetails.slice(0, -1));
      setPartnersNumber(newPartnersNumber);
      return;
    }

    setPartnersNumber(newPartnersNumber);

    for (let i = 0; i <= newPartnersNumber; i++) {
      setPartnersDetails([
        ...partnersDetails,
        {
          first_name: "",
          last_name: "",
          nationality: "",
          country: "",
          city: "",
          address: "",
          whatsapp_number: "",
          email: "",
          dob: "",
          share_holds: "",
          passport: ""
        }
      ]);
    }
  };

  // Handler function to update partner information
  const handlePartnerChange = (
    field: string,
    value: string,
    partnerIndex: number
  ) => {
    const updatedPartners = [...partnersDetails];
    updatedPartners[partnerIndex] = {
      ...updatedPartners[partnerIndex],
      [field]: value
    };
    setPartnersDetails(updatedPartners);
  };

  // Handler function to update partner information
  const handlePersonalInformationChange = (field: string, value: string) => {
    setPersonalInfromation({
      ...personalInfromation,
      [field]: value
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (page === 0) {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox: any, idx: number) => {
        const checkboxData = checkbox.getAttribute("data-value");
        const selectedAddonsData = `${selectedAddons}|${checkboxData}`;
        setSelectedAddons(selectedAddonsData);
      });
    }

    if (page === 1) {
      setIsLoading(true);
      try {
        await axios.post('/users/checkEmail', {
          email: personalInfromation.email,
        });

        setError(null);
      } catch (e: any) {
        setError(e.response.data.data.message);
        return;
      }
      setIsLoading(false);
    }

    if (page === 3) {
      const registerationData = {
        company: {
          country,
          name: companyName,
          activities: companyActivities.label,
          package: companyPackage,
          addons: selectedAddonNames
        },
        user: personalInfromation,
        partners: partnersDetails
      };

      try {
        setIsLoading(true);
        const { data } = await axios.post("/auth/register", registerationData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        dispatch(setAuth({ token: data.token }));
        setOrderID(data.order.id);
        setTotalPrice(data.order.total_price);
        setInitialPrice(data.order.total_price);
        setIsLoading(false);
      } catch (e: any) {
        console.error(e);
        setError(e.response?.message);
        setIsLoading(false);
      }
    }

    if (page < 4) {
      setPage(page + 1);
    }
  };

  const applyCoupon = async () => {
    try {
      await axios.get(`/promo-codes/${appliedPromoCode}`);
      const { data } = await axios.get(
        `/promo-codes/${appliedPromoCode}/${orderID}`
      );

      setTotalPrice(data.data.order.total_price);
      setError(null);
    } catch (e: any) {
      console.error(e);
      setError("This Promo Code Cannot Be Applied");
      setTotalPrice(initialPrice);
    }
  };

  return (
    <>
      {payment ? (
        !isLoading ? (
          <CheckoutForm orderID={orderID} setLoading={setIsLoading} />
        ) : (
          <Loading />
        )
      ) : (
        <>
          {page === 0 && (
            <form onSubmit={handleSubmit}>
              <div className="form-container">
                <h2 className="form-title">Company Infromation</h2>
                <div className="form-group">
                  <label htmlFor="company-name">Comapny Name</label>
                  <input
                    onChange={(event) => setCompanyName(event?.target.value)}
                    value={companyName}
                    id="company-name"
                    type="text"
                    placeholder="Comapny Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company-activities">Company Activities</label>
                  <Select
                    value={companyActivities}
                    onChange={(event: any) => setCompanyActivities(event)}
                    options={activities}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <Select
                    value={state}
                    onChange={(event: any) => setState(event)}
                    options={states}
                  />
                </div>
              </div>
              <div className="addons">
                <h2 className="title">Addons</h2>
                <div className="addons-container">
                  {addons &&
                    addons.map((addon: any, idx: number) => (
                      <label
                        id={`addon-${idx}-label`}
                        htmlFor={`addon-${idx}`}
                        className="addon"
                      >
                        <input
                          type="checkbox"
                          id={`addon-${idx}`}
                          checked={addonStates[idx] || false}
                          onChange={() => handleAddonButtonClick(idx)}
                        />
                        <div>
                          <h3>{addon.name}</h3>
                          <p className="description">{addon.description}</p>
                          <div className="price-container">
                            <div className="old-price">
                              <del>${addon.discounted_price}</del>
                              <span className="discount-percentage">
                                {100 - Math.ceil((addon.price / addon.discounted_price) * 100)}%
                                OFF
                              </span>
                            </div>
                            <div className="current-price">
                              <p className="price">${addon.price}</p>
                              <p className="note">
                                Renews at ${addon.renewal_price}
                              </p>
                            </div>
                          </div>
                          <div className="actions">
                            <Button
                              onClick={() => handleAddonButtonClick(idx)}
                              style={addonStates[idx] ? "danger" : "info"}
                            >
                              {addonStates[idx] ? "Remove Addon" : "Add Addon"}
                            </Button>
                          </div>
                        </div>
                      </label>
                    ))}
                </div>
              </div>
              <FormActions
                page={page}
                havePartners={havePartners}
                setPage={setPage}
              />
            </form>
          )}
          {page === 1 && (
            <form onSubmit={handleSubmit}>
              <div className="form-container">
                <h2 className="form-title">Personal Infromation</h2>
                <PersonalInfromationForm
                  onChange={(field: any, value: any) =>
                    handlePersonalInformationChange(field, value)
                  }
                  partner={personalInfromation}
                />
              </div>
              <FormActions
                page={page}
                havePartners={havePartners}
                setPage={setPage}
              />
            </form>
          )}
          {page === 2 &&
            (!havePartners ? (
              <form onSubmit={handleSubmit}>
                <div className="ask-about-partners">
                  <div className="image">
                    <img src={CollaboratorsImage} alt="CollaboratorsImage" />
                  </div>
                  <p>Do You Have Partners?</p>
                  <div className="actions">
                    <Button onClick={() => setPage(page + 1)} style="secondary">
                      No
                    </Button>
                    <Button onClick={handlePartnersYesButton} style="primary">
                      Yes
                    </Button>
                  </div>
                </div>
                <FormActions
                  page={page}
                  havePartners={havePartners}
                  setPage={setPage}
                />
              </form>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-container">
                  <div className="form-group">
                    <label htmlFor="partners-number">
                      How many partners do you have?
                    </label>
                    <input
                      onChange={handlePartnersNumberChange}
                      id="partners-number"
                      type="number"
                      value={partnersNumber}
                      max={6}
                    />
                    <p className="note">Maximum partners: 6</p>
                  </div>
                  {partnersDetails.map((partner: any, idx: number) => (
                    <div className="personal-information-form">
                      <h2 className="partner-name">Partner {idx + 1}</h2>
                      <PersonalInfromationForm
                        partner={partner}
                        onChange={(field: any, value: any) =>
                          handlePartnerChange(field, value, idx)
                        }
                      />
                    </div>
                  ))}
                  <h1>share_holds</h1>
                  <hr />
                  <div className="form-group">
                    <span className="user">
                      {personalInfromation.first_name}{" "}
                      {personalInfromation.last_name}
                    </span>
                    <input
                      onChange={(event) =>
                        handlePersonalInformationChange(
                          "share_holds",
                          event.target.value
                        )
                      }
                      value={personalInfromation.share_holds}
                      type="number"
                      required
                    />
                  </div>
                  {partnersDetails.map((partner: any, idx: number) => (
                    <div className="form-group">
                      <span className="user">
                        {partner.first_name} {partner.last_name}
                      </span>
                      <input
                        onChange={(event) =>
                          handlePartnerChange(
                            "share_holds",
                            event.target.value,
                            idx
                          )
                        }
                        value={partner.share_holds}
                        type="number"
                        required
                      />
                    </div>
                  ))}
                </div>
                <FormActions
                  page={page}
                  havePartners={havePartners}
                  setPage={setPage}
                />
              </form>
            ))}
          {page === 3 && (
            <form onSubmit={handleSubmit}>
              <div className="verification-title">
                <h2>Verification</h2>
                <p>Please upload passport picture of every partner</p>
              </div>
              <div className="verification-container">
                <div className="partner-card">
                  <div className="image">
                    <img
                      src={
                        personalInfromation.passport
                          ? URL.createObjectURL(personalInfromation.passport)
                          : Avatar
                      }
                      alt={personalInfromation.first_name}
                    />
                  </div>
                  <h4 className="partner-verification-name">
                    {personalInfromation.first_name}{" "}
                    {personalInfromation.last_name}
                  </h4>
                  <input
                    onChange={(event) => {
                      const selectedFile: any = event.target.files![0];

                      if (selectedFile) {
                        handlePersonalInformationChange(
                          "passport",
                          selectedFile
                        );
                      }
                    }}
                    type="file"
                    required
                  />
                </div>
                {partnersDetails.map((partner: any, idx: number) => (
                  <div className="partner-card">
                    <div className="image">
                      <img
                        src={
                          partner.passport
                            ? URL.createObjectURL(partner.passport)
                            : Avatar
                        }
                        alt={partner.first_name}
                      />
                    </div>
                    <h4 className="partner-verification-name">
                      {partner.first_name} {partner.last_name}
                    </h4>
                    <input
                      onChange={(event) => {
                        const selectedFile: any = event.target.files![0];

                        if (selectedFile) {
                          handlePartnerChange("passport", selectedFile, idx);
                        }
                      }}
                      type="file"
                      required
                    />
                  </div>
                ))}
              </div>
              <FormActions
                page={page}
                havePartners={havePartners}
                setPage={setPage}
              />
            </form>
          )}
          {page === 4 &&
            (isLoading ? (
              <Loading />
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="price-container">
                  <h3>
                    Total Price:{" "}
                    <b>
                      ${totalPrice}{" "}
                      {totalPrice !== initialPrice && (
                        <del>${initialPrice}</del>
                      )}
                    </b>
                  </h3>
                  <div className="promo-code">
                    <label htmlFor="promo-code">Promo Code</label>
                    <div className="input-container form-group">
                      <input
                        onChange={(event: any) =>
                          setAppliedPromoCode(event.target.value)
                        }
                        id="promo-code"
                        placeholder="Promo Code"
                        type="text"
                      />
                      <Button onClick={applyCoupon} style="info">
                        Apply Code
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="payment-container">
                  <div
                    onClick={() => setPayment(true)}
                    className="payment-card"
                  >
                    <div className="icon">
                      <BsFillCreditCard2FrontFill />
                    </div>
                    <h3>Bank Card</h3>
                  </div>
                  <div
                    onClick={() => navigate(`/order-status/${orderID}`)}
                    className="payment-card"
                  >
                    <div className="icon">
                      <TbCash />
                    </div>
                    <h3>Money Transfer</h3>
                  </div>
                </div>
                <FormActions
                  page={page}
                  havePartners={havePartners}
                  setPage={setPage}
                />
              </form>
            ))}
        </>
      )}
    </>
  );
}

export default CanadaForm;
