// Packages
import React from "react";

interface PersonalInformationProps {
  partner: {
    first_name: string;
    last_name: string;
    nationality: string;
    country: string;
    city: string;
    address: string;
    whatsapp_number: string;
    email: string;
    dob: string;
  };
  onChange: (field: string, value: string) => void;
}
function PersonalInfromationForm({
  partner,
  onChange
}: PersonalInformationProps) {
  return (
    <>
      <div className="form-group">
        <label htmlFor="first-name">First Name</label>
        <input
          onChange={(event) => onChange("first_name", event.target.value)}
          value={partner.first_name}
          id="first-name"
          type="text"
          placeholder="First Name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="first-name">Last Name</label>
        <input
          onChange={(event) => onChange("last_name", event.target.value)}
          value={partner.last_name}
          id="last-name"
          type="text"
          placeholder="Last Name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="nationality">Nationality</label>
        <input
          onChange={(event) => onChange("nationality", event.target.value)}
          value={partner.nationality}
          id="nationality"
          type="text"
          placeholder="Nationality"
        />
      </div>
      <div className="form-group">
        <label htmlFor="country">Residence Country</label>
        <input
          onChange={(event) => onChange("country", event.target.value)}
          value={partner.country}
          id="country"
          type="text"
          placeholder="Residence Country"
        />
      </div>
      <div className="form-group">
        <label htmlFor="city">City</label>
        <input
          onChange={(event) => onChange("city", event.target.value)}
          value={partner.city}
          id="city"
          type="text"
          placeholder="City"
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          onChange={(event) => onChange("address", event.target.value)}
          value={partner.address}
          id="address"
          type="text"
          placeholder="Address"
        />
      </div>
      <div className="form-group">
        <label htmlFor="whatsapp-number">Whatsapp Number</label>
        <input
          onChange={(event) => onChange("whatsapp_number", event.target.value)}
          value={partner.whatsapp_number}
          id="whatsapp-number"
          type="text"
          placeholder="Whatsapp Number"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">E-Mail</label>
        <input
          onChange={(event) => onChange("email", event.target.value)}
          value={partner.email}
          id="email"
          type="email"
          placeholder="E-Mail"
        />
      </div>
      <div className="form-group">
        <label htmlFor="dob">Date of Birth</label>
        <input
          onChange={(event) => onChange("dob", event.target.value)}
          value={partner.dob}
          id="dob"
          type="date"
        />
      </div>
    </>
  );
}

export default PersonalInfromationForm;
