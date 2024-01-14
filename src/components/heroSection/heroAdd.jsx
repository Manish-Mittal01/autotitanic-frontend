import React from "react";

export default function HeroAdd() {
  return (
    <div className="d-flex justify-content-between">
      <div
        className="fullSizeAddContainer d-none d-xl-flex ms-2"
        style={{ width: 728, height: 90, marginInline: 0 }}
      >
        Add Container
        <br />
        (728 x 90)
      </div>
      <div className="personalAdd">Personal Add</div>
    </div>
  );
}
