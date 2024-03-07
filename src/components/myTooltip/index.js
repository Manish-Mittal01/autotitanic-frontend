import React from "react";

function Tooltip(props) {
  const { text, children, showTooltip } = props;
  return (
    <div className="myTooltip d-flex align-items-center">
      <p onClick={showTooltip} className="pointer filterValue m-0">
        {text}
      </p>
      {children}
    </div>
  );
}

export default Tooltip;
