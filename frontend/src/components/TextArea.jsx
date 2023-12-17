import { Form, Button } from "react-bootstrap";
import ButtonSave from "./ButtonSave";
import "./TextArea.css";
import { useState } from "react";

export default function TextArea({
  name,
  placeholder,
  // defaultValue,
  label,
  date,
  onSubmit,
  defaultValue,
  onChange,
}) {
  return (
    <section className="textarea-wrapper">
      <p className="p3 textarea-date">{date}</p>
      <h3 style={{margin: "0"}}>{label}</h3>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          {/* <Form.Label className="h3"> {label}</Form.Label> */}
          <Form.Control
            className="textarea edit"
            name={name}
            as="textarea"
            placeholder={placeholder}
            rows={20} //should be responsive
            cols={35} //
            defaultValue={defaultValue}
            onChange={onChange}
          />
        </Form.Group>
        <div
          className="BackNav-wrapper"
          style={{
            position: "fixed",
            top: "-4.3em",
            right: "2.5rem",
            minWidth: "90px",
          }}
        >
          <ButtonSave
            // style={{ display: "none" }}
            type="submit"
          >
            SAVE
          </ButtonSave>
        </div>
      </Form>
    </section>
  );
}
