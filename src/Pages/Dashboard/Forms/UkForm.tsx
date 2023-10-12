// Packages
import React, { useEffect, useRef, useState } from "react";
import MultiSelect from "../../../Components/Forms/MultiSelect";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// Components
import Button from "../../../Components/Button";
import FormActions from "./Uk/FormActions";
import CheckoutForm from "./Components/CheckoutForm";
import Loading from "../../../Components/Loading";
import PersonalInfromationForm from "./Components/PersonalInformation";

// Data
import { options } from "../../Register/data/siccodes";

// Static
import CollaboratorsImage from "../../../Images/collaborators.png";
import Avatar from "../../../Images/avatar.svg";

// Styles
import {
  BsFillCreditCard2FrontFill,
  TbCash,
  AiOutlineSearch
} from "../../../Config/icons";
import "../../../styles/Forms/UkForm.scss";

// Store
import { RootState } from "../../../Store";

interface Props {
  page: number;
  setPage: any;
}

function UkForm({ page, setPage }: Props) {
  // Global Variables
  const token: any = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<any>(null);
  const [payment, setPayment] = useState(false);
  const companyNameField = useRef<any>();
  const { country, package: companyPackage } = useParams();

  // Comapny Infromation
  const [companyName, setCompanyName] = useState("");
  const [sicCodes, setSicCodes] = useState<any>([]);
  const [totalShares, setTotalShares] = useState<any>("");
  const [sharePrice, setSharePrice] = useState<any>("");
  const [creatorShareHolds, setCreatorShareHolds] = useState<any>(100);

  const [addonStates, setAddonStates] = useState<boolean[]>([]);
  const [addons, setAddons] = useState<any>();
  const [selectedAddonNames, setSelectedAddonNames] = useState<string[]>([]);
  const [orderID, setOrderID] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

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

  const checkCompanyName = async () => {
    companyNameField.current.disabled = true;

    try {
      const { data } = await axios.get(`/companies/check/${companyName}`);

      if (data.data.is_taken) {
        setError("Company Name Is Already Taken");
        setSuccess(null);

        return true;
      } else {
        setSuccess("Company Name Is Available");
        setError(null);

        return false;
      }
    } catch (e) {
      console.error(e);
    }

    companyNameField.current.disabled = false;
  };

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

  const handleSubmit = async (event: any = null) => {
    if (event) event.preventDefault();

    setError(null);
    setSuccess(null);

    if (page === 0) {
      if (sicCodes.length < 1) {
        setError("SIC Codes Cannot Be Empty");
        setSuccess(null);
        return;
      }

      setIsLoading(true);
      const isCompanyNameTaken = await checkCompanyName();

      if (isCompanyNameTaken) {
        setIsLoading(false);
        return;
      }
      setIsLoading(false);

      console.log(selectedAddonNames);
    }

    if (page === 2) {
      let activities: Array<string> = [];

      sicCodes.forEach((code: any) => {
        activities.push(code.label);
      });

      const activitiesString = activities.join(",");

      const registerationData = {
        user: {
          share_holds: creatorShareHolds
        },
        company: {
          country,
          name: companyName,
          activities: activitiesString,
          package: companyPackage,
          addons: selectedAddonNames,
          total_shares: totalShares,
          share_price: sharePrice,
        },
        partners: partnersDetails
      };

      try {
        setIsLoading(true);
        const { data } = await axios.post("/companies", registerationData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        });

        setOrderID(data.data.order.id);
        setOrderID(data.data.order.id);
        setTotalPrice(data.data.order.total_price);
        setInitialPrice(data.data.order.total_price);
        setIsLoading(false);
      } catch (e: any) {
        console.error(e);
        setError(e.response?.message);
        setIsLoading(false);
      }
    }

    if (page < 4) {
      setPage(page + 1);
      setSuccess(null);
      setError(null);
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
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          {page === 0 && (
            <form onSubmit={handleSubmit}>
              <div className="form-container">
                <h2 className="form-title">Company Infromation</h2>
                <div className="form-group">
                  <label htmlFor="company-name">Comapny Name</label>
                  <div className="input">
                    <input
                      ref={companyNameField}
                      onChange={(event) => setCompanyName(event?.target.value)}
                      value={companyName}
                      id="company-name"
                      type="text"
                      placeholder="Comapny Name"
                      required
                    />
                    <button onClick={checkCompanyName} type="button">
                      <AiOutlineSearch />
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="company-name">SIC Codes</label>
                  <MultiSelect
                    valueList={sicCodes}
                    onChange={(event: any) => setSicCodes(event)}
                    options={options}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company-name">Total Shares</label>
                  <input
                    onChange={(event) => setTotalShares(event?.target.value)}
                    value={totalShares}
                    id="total-shares"
                    type="number"
                    placeholder="Total Shares"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company-name">Share Price</label>
                  <div className="input">
                    <input
                      onChange={(event) => setSharePrice(event?.target.value)}
                      value={sharePrice}
                      id="share-price"
                      type="number"
                      placeholder="Share Price (GBP)"
                      required
                    />
                    <span className="currency">GBP</span>
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
                                  {100 - Math.ceil((addon.price / addon.discounted_price) * 100)}
                                  % OFF
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
                                {addonStates[idx]
                                  ? "Remove Addon"
                                  : "Add Addon"}
                              </Button>
                            </div>
                          </div>
                        </label>
                      ))}
                  </div>
                </div>
              </div>
              <FormActions
                page={page}
                havePartners={havePartners}
                setPage={setPage}
                dashboardCreation={true}
                handleSubmit={handleSubmit}
              />
            </form>
          )}
          {page === 1 &&
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
                  dashboardCreation={true}
                  handleSubmit={handleSubmit}
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
                    <span className="user">Company Creator Shareholds (You)</span>
                    <input
                      onChange={(event) =>
                        setCreatorShareHolds(event.target.value)
                      }
                      value={creatorShareHolds}
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
                  dashboardCreation={true}
                  handleSubmit={handleSubmit}
                />
              </form>
            ))}
          {page === 2 &&
            (isLoading ? (
              <Loading />
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="verification-title">
                  <h2>Verification</h2>
                  <p>Please upload passport picture of every partner</p>
                </div>
                <div className="verification-container">
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
                  dashboardCreation={true}
                  handleSubmit={handleSubmit}
                />
              </form>
            ))}
          {page === 3 &&
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
              </form>
            ))}
        </>
      )}
    </>
  );
}

export default UkForm;
