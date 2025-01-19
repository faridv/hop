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
    <path d="M17 18a5 5 0 0 0-10 0m5-16v7m-7.78 1.22 1.42 1.42M1 18h2m18 0h2m-4.64-6.36 1.42-1.42M23 22H1M8 6l4-4 4 4"/>
  </svg>
);
export { SvgComponent as SunriseIcon };
