import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19 21C19 19.3431 20.3431 18 22 18H26C27.6569 18 29 19.3431 29 21V39C29 40.6569 27.6569 42 26 42H22C20.3431 42 19 40.6569 19 39V21ZM22 20C21.4477 20 21 20.4477 21 21V39C21 39.5523 21.4477 40 22 40H26C26.5523 40 27 39.5523 27 39V21C27 20.4477 26.5523 20 26 20H22Z"
      fill="currentColor"
    />
    <path
      d="M6 33C6 31.3431 7.34315 30 9 30H13C14.6569 30 16 31.3431 16 33V39C16 40.6569 14.6569 42 13 42H9C7.34315 42 6 40.6569 6 39V33Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M32 9C32 7.34315 33.3431 6 35 6H39C40.6569 6 42 7.34315 42 9V39C42 40.6569 40.6569 42 39 42H35C33.3431 42 32 40.6569 32 39V9ZM35 8C34.4477 8 34 8.44772 34 9V39C34 39.5523 34.4477 40 35 40H39C39.5523 40 40 39.5523 40 39V9C40 8.44772 39.5523 8 39 8H35Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgComponent;
