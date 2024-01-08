import React from "react";
import { Tooltip } from "react-bootstrap";

export default function MyTooltip(text) {
  return <Tooltip id="tooltip">{text}</Tooltip>;
}
