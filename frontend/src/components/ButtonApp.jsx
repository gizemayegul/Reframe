import React from 'react';
import Button from 'react-bootstrap/Button';
import './ButtonApp.css';

export default function ButtonApp({ navigate, label, classCss, type }) {
  return (
    <div className="flex-center">
      <Button className={`btn-app ${classCss}`} href={navigate} type={type}>
        {label}
      </Button>
    </div>
  );
}
