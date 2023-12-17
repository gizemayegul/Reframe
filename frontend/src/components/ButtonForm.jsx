import React from "react";
import Button from "react-bootstrap/Button";
import "./ButtonForm.css";
import ArrowRight from "../assets/arrow-right.svg";

export default function ButtonForm({ navigate, label, onClick, size }) {
  return (
    <Button className="btn-form" size={size} href={navigate} onClick={onClick}>
      {label}
      <img src={ArrowRight} alt="arrow_right" />
    </Button>
  );
}
