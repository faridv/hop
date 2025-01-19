import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      d="M12 14a1 1 0 1 0-1-1 1 1 0 0 0 1 1zm5 0a1 1 0 1 0-1-1 1 1 0 0 0 1 1zm-5 4a1 1 0 1 0-1-1 1 1 0 0 0 1 1zm5 0a1 1 0 1 0-1-1 1 1 0 0 0 1 1zM7 14a1 1 0 1 0-1-1 1 1 0 0 0 1 1zM19 4h-1V3a1 1 0 0 0-2 0v1H8V3a1 1 0 0 0-2 0v1H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm1 15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9h16zm0-11H4V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1zM7 18a1 1 0 1 0-1-1 1 1 0 0 0 1 1z"/>
  </svg>
);
export { SvgComponent as ScheduleIcon };
