// Packages
import React from "react";

// Styles
import "../../styles/Packages/Container.scss"

interface Props {
  children: any;
  title: string;
  style?: any;
  id?: any;
}

function Container({ children, title, style = {}, id = '' }: Props) {
  return (
    <div id={id} className="packages-container">
      <h2 className="container-title">{title}</h2>
      <div className="container" style={style}>{children}</div>
    </div>
  )
}

export default Container;