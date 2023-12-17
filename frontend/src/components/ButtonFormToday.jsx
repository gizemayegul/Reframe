import React from "react";
import Button from "react-bootstrap/Button";
import "./ButtonForm.css";

export default function ButtonForm({ label, onClick, size }) {
  return (
    <Button className="btn-form" size={size} onClick={onClick}>
      {label}
      <img src="../../public/arrow-right.svg" alt="arrow_right" />
    </Button>
  );
}
