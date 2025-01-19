import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M2 12 7 2m0 10 5-10m0 10 5-10m0 10 5-10M4.5 7h15M12 16v6"/>
  </svg>
);
export { SvgComponent as AntennaIcon };
