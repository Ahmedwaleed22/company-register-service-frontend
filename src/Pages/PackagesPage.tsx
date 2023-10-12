// Packages
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// Components
import MainLayout from "../Layouts/MainLayout";
import Packages from "../Components/Packages/Packages";
import Loading from "../Components/Loading";
import NotFoundPage from "./Errors/NotFoundPage";

// Static
import UkFlag from "../Images/uk.jpeg";
import UsFlag from "../Images/us.jpeg";
import CanadaFlag from "../Images/canada.jpeg";

function PackagesPage() {
  // Global Variables
  const { country }: any = useParams();

  // State Variables
  const [isLoading, setIsLoading] = useState(true);
  const [packages, setPackages] = useState<any>(null);
  const [Image, setImage] = useState("uk");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    switch (country) {
      case "uk":
        setImage(UkFlag);
        break;
      case "us":
        setImage(UsFlag);
        break;
      case "canada":
        setImage(CanadaFlag);
        break;
      default:
        setNotFound(true);
    }

    const askApi = async () => {
      try {
        const { data } = await axios.get(`/packages/sub/${country}`);
        setPackages(data.data);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    }

    askApi();
  }, [country, setImage, setPackages]);

  if (notFound) {
    return <NotFoundPage />
  }

  return (
    <MainLayout>
      <Packages.Container title="Explore Our Packages" id="packages">
        {isLoading ? (
          <Loading />
        ) : (
          packages && packages.map((companyPackage: any, idx: number) => (
            <Packages.Card
              type={country}
              background={Image}
              title={companyPackage.name}
              slug={companyPackage.slug}
              price={companyPackage.price}
              oldPrice={companyPackage.discounted_price}
              renewalPrice={companyPackage.renewal_price}
              currency="Dollar"
              features={companyPackage.features.split('|')}
              isSub={true}
            />
          ))
        )}
      </Packages.Container>
    </MainLayout>
  );
}

export default PackagesPage;
