import React from "react";
import Select from "react-select";

export default function SelectBox({ ...props }) {
  return (
    <>
      <Select
        className="countrySelect w-100"
        components={{
          IndicatorSeparator: null,
          ...props.components,
        }}
        styles={{
          placeholder: (basic) => {
            return { ...basic, whiteSpace: "nowrap", textOverflow: "ellipsis" };
          },
          ...props.styles,
        }}
        {...props}
      />
    </>
  );
}
