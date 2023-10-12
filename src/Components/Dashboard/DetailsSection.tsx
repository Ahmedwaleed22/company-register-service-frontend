// Packages
import React from 'react'

// Styles
import '../../styles/Dashboard/Components/DetailsSection.scss'

function DetailsSection({ children, title }: any) {
  return (
    <section className="details-section">
      <div className="title-container">
        <h2 className="title">{title}</h2>
      </div>
      <div className="container">
        {children}
      </div>
    </section>
  )
}

export default DetailsSection