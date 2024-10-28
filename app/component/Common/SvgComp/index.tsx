import React from "react";
import SVG from "react-inlinesvg";

type svgProps = {
  src: string;
  classes?: string;
};

const SvgComp = ({src, classes}: svgProps) => {
  return <SVG src={src} className={`${classes}`} />;
};
export default SvgComp;
