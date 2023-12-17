import React from "react";

import { useNavigate } from "react-router-dom";
import ButtonIcon from "./ButtonIcon";

export default function BackNav() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <ButtonIcon
        id="goBack"
        imgSrc="../../public/goBack.svg"
        onClick={handleGoBack}
      />
    </>
  );
}
