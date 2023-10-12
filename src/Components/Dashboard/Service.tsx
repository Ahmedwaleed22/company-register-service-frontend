import React from 'react'
import { useNavigate } from 'react-router-dom';

interface Props {
  title: string;
  description: string;
  path: string;
}

function Service({ title, description, path }: Props) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(path)} className="service">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default Service