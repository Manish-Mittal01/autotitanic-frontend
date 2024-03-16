import { OverlayTrigger, Tooltip } from "react-bootstrap";

export const MyTooltip = ({ children, text, ...rest }) => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {text || ""}
    </Tooltip>
  );

  return (
    <OverlayTrigger overlay={renderTooltip} {...rest}>
      <span className="pointer">{children}</span>
    </OverlayTrigger>
  );
};
