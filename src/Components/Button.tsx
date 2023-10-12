// Packages
import React from 'react';

// Styles
import '../styles/Button.scss';

interface Props {
  children: any;
  style: string;
  onClick?: any;
  type?: any;
}

function Button({ children, style, onClick, type = "button" }: Props) {
  return (
    <button type={type} onClick={onClick} className={`btn btn-${style}`}>{children}</button>
  )
}

export default Button