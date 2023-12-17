import "./PageSub.css";
import BackNav from "./BackNav";

export default function PageSub() {
  return (

    <div>


    <div
      className="background-wrap"
      style={{

        position: "relative",
        overflow: "hidden",
        margin: "0",
        padding: "0",
        zIndex: "-2",
      }}
    >

      <div
        className="sub-background"
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#F1F2E9",
          zIndex: "-1",
        }}
      ></div>
    </div>
      <div
        className="BackNav-wrapper"
        style={{
          position: "fixed",
          top: "2.5em",
          left: "2.5em",
          minWidth: "90px",
          zIndex: "2",
        }}
      >

        <BackNav />
      </div>
    </div>
  );
}
