import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import './InputField.css';

function InputField({ id, label, type, placeholder, onChange, defaultValue }) {
  return (
    <>
      <FloatingLabel controlId={id} label={label} className="mb-3">
        <Form.Control type={type} placeholder={placeholder} onChange={onChange} defaultValue={defaultValue} />
      </FloatingLabel>
    </>
  );
}

export default InputField;
