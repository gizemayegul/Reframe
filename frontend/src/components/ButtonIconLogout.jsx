import React from 'react';
import Button from 'react-bootstrap/Button';
import './ButtonIcon.css';
import { BsDoorClosed } from 'react-icons/bs';

export default function ButtonIconLogout({ navigate, label, type, id, onClick }) {
  return (
    <Button className="btn-icon" href={navigate} type={type} onClick={onClick}>
      <div className="d-flex align-items-center">
        <BsDoorClosed style={{ width: '16px', height: '16px', margin: '0' }} />
        {label}
      </div>
    </Button>
  );
}
