// Packages
import React, { useState } from "react";
import { Stepper } from "react-form-stepper";
import { useParams } from "react-router-dom";

// Components
import MainLayout from "../../Layouts/MainLayout";
import UkForm from "./Forms/UkForm";
import UsForm from "./Forms/UsForm";
import CanadaForm from "./Forms/CanadaForm";

// Styles
import "../../styles/Register.scss";

function Register() {
  const [activeStep, setActiveStep] = useState(0);
  let { country } = useParams();

  const formSteps = [
    { label: "Company Information" },
    { label: "Personal Information" },
    { label: "Partners" },
    { label: "Verification" },
    { label: "Payment" },
  ];

  return (
    <MainLayout>
      <div className="form">
        <Stepper steps={formSteps} activeStep={activeStep} />
        {/* Uk Form */}
        {country === 'uk' && (
          <UkForm page={activeStep} setPage={setActiveStep} />
        )}
        {/* End Uk Form */}

        {/* Us Form */}
        {country === 'us' && (
          <UsForm page={activeStep} setPage={setActiveStep} />
        )}
        {/* End Us Form */}

        {/* Canada Form */}
        {country === 'canada' && (
          <CanadaForm page={activeStep} setPage={setActiveStep} />
        )}
        {/* End Canada Form */}
      </div>
    </MainLayout>
  );
}

export default Register;
