import { Form, Button } from "react-bootstrap";
import "./TextAreaTimelineEdit.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TextArea({
  name,
  label,
  date,
  placeholder,
  defaultValue,
  onSubmit,
  onChange,
  children,
}) {


  // const handleFormSubmit = (e) => {
  //   e.preventDefault(); // Prevent the default form submission behavior
  //   if (typeof onSubmit === 'function') {
  //     onSubmit(e); // Call the provided onSubmit function
  //     useNavigate(-1)
  //   }
  // };


  return (
    <section className="textarea-wrapper-timeline">
      <p className="textarea-date p3" style={{fontWeight: '700'}}>{date}</p>
      <h3 style={{margin: "0"}}>{label}</h3>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          {/* <h4 className="date-textarea">{date}</h4>
          <Form.Label> {label}</Form.Label> */}
          <Form.Control
            className="textarea"
            name={name}
            as="textarea"
            placeholder={placeholder}
            rows={20} //should be responsive
            cols={35} //
            defaultValue={defaultValue}
            onChange={onChange}
          />
        </Form.Group>
        <div className="btn-textarea-save">{children}</div>
      </Form>
    </section>
  );
}
