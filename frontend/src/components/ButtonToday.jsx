import React from "react";
import "./ButtonForm.css";
import ButtonForm from "./ButtonForm";
export default function ButtonToday({
  navigate,
  label,
  onClick,
  imgSrc,
  imgAlt,
  id,
}) {
  return (
    <div className="today-btn">
      <ButtonForm label={label} onClick={onClick} />
      <img id={id} src={imgSrc} alt={imgAlt} />
    </div>
  );
}
