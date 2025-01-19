import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 16 16"
    {...props}
  >
    <path d="M14 2v13H3.5a1.5 1.5 0 1 1 0-3H13V0H3C1.9 0 1 .9 1 2v12c0 1.1.9 2 2 2h12V2h-1z"/>
    <path d="M3.501 13H3.5a.5.5 0 0 0 0 1h9.499v-1H3.501z"/>
  </svg>
);
export { SvgComponent as BookIcon };
