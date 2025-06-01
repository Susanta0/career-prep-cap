import React from "react";
const QuoteButton = ({ onClick, label, themeColor }) => {
  return (
    <button
      onClick={onClick}
      style={{
        color: themeColor,
        border: `1px solid ${themeColor}`,
        padding: "10px",
        marginRight: "10px",
        background: "transparent",
        borderRadius: "5px",
      }}
    >
      {label}
    </button>
  );
};

export default QuoteButton;
