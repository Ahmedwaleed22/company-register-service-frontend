// Packages
import React from 'react';

// Static
import LoadingSpinner from '../Images/loading-spinner.gif';

// Styles
import '../styles/loading.scss';

function Loading() {
  return (
    <div className="loading-container">
      <img src={LoadingSpinner} alt="Loading Spinner" />
    </div>
  )
}

export default Loading