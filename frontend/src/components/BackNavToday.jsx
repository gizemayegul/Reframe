import ButtonIcon from "./ButtonIcon";
export default function BackNavToday({ onClick }) {
  return (
    <>
      <ButtonIcon id="goBack" imgSrc="./goBack.svg" onClick={onClick} />
    </>
  );
}
