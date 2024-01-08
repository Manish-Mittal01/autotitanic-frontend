import React from "react";

function Tooltip(props) {
  const { text, children, showTooltip } = props;
  return (
    <div className="myTooltip">
      <span onClick={showTooltip} className="pointer">
        {text}
      </span>
      {children}
    </div>
  );
}

export default Tooltip;
