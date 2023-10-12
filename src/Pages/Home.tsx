// Packages
import React, { useEffect, useState } from "react";
import { Zoom } from "react-awesome-reveal";
import axios from "axios";
import Slider from "react-slick";

// Layouts
import MainLayout from "../Layouts/MainLayout";

// Components
import Button from "../Components/Button";
import Packages from "../Components/Packages/Packages";

// Static
import AgreementImage from "../Images/agreement.jpeg";
import UkFlag from "../Images/uk.jpeg";
import UsFlag from "../Images/us.jpeg";
import CanadaFlag from "../Images/canada.jpeg";
import GoogleReview from "../Images/google-review.jpeg";

import SearchIcon from "../Images/search-icon.png";
import PackageIcon from "../Images/package-icon.png";
import CheckoutIcon from "../Images/cart-icon.png";
import DetailsIcon from "../Images/details-icon.png";
import HowItWorks from "../Components/HowItWorks";
import Loading from "../Components/Loading";

// Styles
import "../styles/Home.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [packages, setPackages] = useState<any>(null);

  const scrollToPackages = () => {
    const packages = document.getElementById("packages");
    packages?.scrollIntoView();
  };

  useEffect(() => {
    const askApi = async () => {
      try {
        const { data } = await axios.get("/packages/main");
        setPackages(data.data);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    askApi();
  }, [setPackages]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };

  return (
    <MainLayout>
      <Zoom fraction={0.1} triggerOnce={true}>
        <div id="showcase">
          <div className="text-container">
            <div className="text">
              <h3 className="title">create a company with just a few clicks</h3>
              <p className="description">
                Start your UK & US & Canada Business, Get a Bank Account, Get
                Paid and more!
              </p>
            </div>
            <div className="actions">
              <Button onClick={scrollToPackages} style="primary">
                Get Started
              </Button>
              <div className="reviews">
                <a
                  href="https://g.page/r/CYSKMOYCaw9IEB0/review"
                  target="_blank"
                >
                  <img
                    width="800"
                    height="385"
                    src={GoogleReview}
                    className="attachment-large size-large wp-image-1869"
                    alt=""
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="image-container">
            <div className="image">
              <img src={AgreementImage} alt="agreement" />
              <div className="overlay"></div>
            </div>
          </div>
        </div>
        <Packages.Container title="Explore Our Packages" id="packages">
          {isLoading ? (
            <div className="loading-container">
              <Loading />
            </div>
          ) : (
            packages &&
            packages.map((companyPackage: any, idx: number) => {
              let Image: any;

              switch (idx) {
                case 0:
                  Image = UkFlag;
                  break;
                case 1:
                  Image = UsFlag;
                  break;
                case 2:
                  Image = CanadaFlag;
                  break;
              }

              return (
                <Packages.Card
                  type={companyPackage.slug}
                  background={Image}
                  title={companyPackage.name}
                  price={companyPackage.price}
                  oldPrice={companyPackage.discounted_price}
                  renewalPrice={companyPackage.renewal_price}
                  currency="Dollar"
                  badge={companyPackage.badge}
                  features={companyPackage.features.split("|")}
                />
              );
            })
          )}
        </Packages.Container>
        <Packages.Container
          id="howitworks"
          title="How it works?"
          style={{ alignItems: "center", marginBottom: "3em" }}
        >
          <HowItWorks
            image={SearchIcon}
            title="Company Name"
            description="Begin by searching for your company name to see if it is available for registration."
          />
          <HowItWorks
            image={PackageIcon}
            title="Select Package"
            description="Select the package that is right for you. We have a range of different options."
          />
          <HowItWorks
            image={CheckoutIcon}
            title="Checkout"
            description="Proceed to checkout. You will also have the option to add additional services."
          />
          <HowItWorks
            image={DetailsIcon}
            title="Company Details"
            description="Quickly fill in your company details and let us take care of the rest."
            lastElement={true}
          />
        </Packages.Container>
        <section id="whyus" className="reviews">
          <div className="text">
            <h2 className="title">
              We’ve helped many business owners launch with confidence
            </h2>
            <p className="paragraph">
              Don’t just take our word for it, check out our verified reviews
              live on Google
            </p>
            <div className="reviews-slider">
              <Slider {...settings}>
                {[...Array(26)].map((_, idx: number) => (
                  <div className="review-card">
                    <img key={idx} src={`/reviews/${idx}.png`} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </section>
      </Zoom>
    </MainLayout>
  );
}

export default Home;
