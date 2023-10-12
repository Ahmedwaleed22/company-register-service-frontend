// Packages
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import MainLayout from '../../Layouts/MainLayout';
import Button from '../../Components/Button';

// Static
import NotFoundImage from '../../Images/notfound.png';

// Styles
import '../../styles/Errors/NotFound.scss'

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="error-page-container">
        <div className="image">
          <img src={NotFoundImage} alt="404 Not Found" />
        </div>
        <Button style="primary" onClick={() => navigate('/')}>Go To Home</Button>
      </div>
    </MainLayout>
  )
}

export default NotFoundPage