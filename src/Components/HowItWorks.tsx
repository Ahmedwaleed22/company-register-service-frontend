// Packages
import React from 'react';

// Styles
import { HiArrowNarrowRight } from '../Config/icons';
import '../styles/HowItWorks.scss';

interface Props {
  image: string;
  title: string;
  description: string;
  lastElement?: boolean;
}

function HowItWorks({ image, title, description, lastElement = false }: Props) {
  return (
    <>    
      <div className="howitworks-card">
        <div className="image">
          <img src={image} alt={title} />
        </div>
        <h3 className="title">{title}</h3>
        <p className="description">{description}</p>
      </div>
      {!lastElement && <span className="how-it-works-arrow"><HiArrowNarrowRight /></span>}
    </>
  )
}

export default HowItWorks