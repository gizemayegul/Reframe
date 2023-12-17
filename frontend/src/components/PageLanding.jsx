import "./PageLanding.css";

export default function PageLanding() {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div
        className="background-wrap"
        style={{
          position: "fixed",
          top: "0%",
          left: "50%",
          transform: "translate(-50%, 0%)",
          height: "100vh",
          width: "100vw",
          backgroundColor: "#F1F2E9",
          boxSizing: "border-box",
          zIndex: "-1",
        }}
      >
      </div>
    </div>
  );
}
