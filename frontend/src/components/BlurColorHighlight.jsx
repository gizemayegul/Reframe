import React from "react";

const BlurColorHighlight = ({ position, size, filter, zIndex }) => {
  const highlightStyle = {
    width: size,
    height: size,
    borderRadius: "50%",
    background: "var(--re-frame-highlight-color, #E8FF88)",
    filter: filter,
    zIndex: zIndex,
    position: "absolute",
    ...position,
  };
  return <div className="color-highlight" style={highlightStyle}></div>;
};

export default BlurColorHighlight;
