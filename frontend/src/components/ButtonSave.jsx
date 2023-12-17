
import React from "react";
import Button from "react-bootstrap/Button";
import "./ButtonSave.css";

export default function ButtonSave({ onClick, type }) {
  return (
    <div className="btn-save">
      <Button type={type} onClick={onClick}>
        <p className="h7">Save</p>
      </Button>
    </div>
  );
}
