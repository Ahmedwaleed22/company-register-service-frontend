// Packages
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Components
import Button from "../Button";

// Styles
import { HiOutlineArrowSmRight } from "../../Config/icons";
import "../../styles/Packages/Card.scss";

// Store
import { RootState } from "../../Store";

interface Props {
  type: string;
  background: string;
  title: string;
  slug?: string;
  price: string;
  currency: string;
  oldPrice: string;
  renewalPrice: string;
  features: any;
  badge?: boolean | null;
  isSub?: boolean;
}

function Card({ background, title, slug, price, currency, oldPrice, renewalPrice, features, type, badge = null, isSub = false }: Props) {
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  let currencySign = '';

  switch (currency) {
    case 'Dollar':
      currencySign = '$';
      break;
    case 'Euro':
      currencySign = '€';
      break;
    case 'Pound':
      currencySign = '£'
      break;
  }

  return (
    <div className="package">
      <header style={{ background: `linear-gradient(to bottom right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${(background)})` }}>
        <h4>{title}</h4>
        {badge && <span className="mark">{badge}</span>}
      </header>
      <section className="price-container">
        <div className="discount">
          <div className="oldPrice">{currencySign}{oldPrice}</div>
          <div className="percentage">%{100 - Math.ceil((+price / +oldPrice) * 100)} OFF</div>
        </div>
        <span className="price">{currencySign}{price}</span>
        <p className="note">Renews at {renewalPrice}/year</p>
      </section>
      <section className="features">
        <ul>
          {features.map((feature: string, idx: number) => (
            <li key={idx}>
              <div className="arrow">
                <HiOutlineArrowSmRight />
              </div>
              <div className="feature">
                {feature}
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="action">
        <Button onClick={() => navigate(`${isSub ? isAuthenticated ? `/dashboard/companies/create/${type}/${slug}` : `/register/${type}/${slug}` : `/packages/${type}`}`)} style="primary">Learn More</Button>
      </section>
    </div>
  )
}

export default Card;