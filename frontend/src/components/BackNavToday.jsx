
import ButtonIcon from "./ButtonIcon";
export default function BackNavToday({ onClick }) {
  return (
    <>
      <ButtonIcon
        id="goBack"
        imgSrc="../../public/goBack.svg"
        onClick={onClick}
      />
    </>
  );
}
