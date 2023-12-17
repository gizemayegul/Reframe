
import React from "react";
import Button from "react-bootstrap/Button";
import "./ButtonIcon.css";

export default function ButtonIcon({
  navigate,
  label,
  type,
  onClick,
  id,
  imgSrc,
  imgAlt,
}) {

  return (
    <div className="btn-icon">
      <Button id={id} href={navigate} type={type} onClick={onClick}>
        <img src={imgSrc} alt={imgAlt} />
        <p className="h7">{label}</p>
      </Button>
    </div>
  );
}
