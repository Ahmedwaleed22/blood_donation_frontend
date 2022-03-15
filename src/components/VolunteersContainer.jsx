import React from 'react'

import '../styles/volunteersContainer.css';

function VolunteersContainer({ children }) {
  return (
    <div className="volunteers-container">
      {children}
    </div>
  )
}

export default VolunteersContainer