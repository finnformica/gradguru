import React from "react";
import type { SVGProps } from "react";

const iconColor = "#BDBDBD";
const iconHeight = 32;
const iconWidth = 32;

export function IconHome(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconWidth}
      height={iconHeight}
      viewBox="0 0 16 16"
      {...props}
    >
      <g fill={iconColor}>
        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"></path>
        <path d="m8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"></path>
      </g>
    </svg>
  );
}

export function IconConsulting(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconWidth}
      height={iconHeight}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill={iconColor}
        fillRule="evenodd"
        d="M11 3a3 3 0 0 0-3 3v1H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3h-3V6a3 3 0 0 0-3-3zm3 4h-4V6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export function IconVideo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconWidth}
      height={iconHeight}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill={iconColor}
        d="M17.525 10.625q.35-.225.35-.625t-.35-.625L12.65 6.25q-.375-.25-.763-.038t-.387.663v6.25q0 .45.388.663t.762-.038zM8 18q-.825 0-1.412-.587T6 16V4q0-.825.588-1.412T8 2h12q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18zm-4 4q-.825 0-1.412-.587T2 20V7q0-.425.288-.712T3 6t.713.288T4 7v13h13q.425 0 .713.288T18 21t-.288.713T17 22z"
      ></path>
    </svg>
  );
}

export function IconTest(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconWidth}
      height={iconHeight}
      viewBox="0 0 48 48"
      {...props}
    >
      <path
        fill={iconColor}
        fillRule="evenodd"
        d="M39 13a3 3 0 0 0-3 3v2h6v-2a3 3 0 0 0-3-3m3 7h-6v16.5l3 4.5l3-4.5zM6 9v30a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3m14 6a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2h-8a1 1 0 0 1-1-1m1 3a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2zm-1 10a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2h-8a1 1 0 0 1-1-1m1 3a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2zm-9-3v3h3v-3zm-1-2h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1m6.707-10.293a1 1 0 0 0-1.414-1.414L13 17.586l-1.293-1.293a1 1 0 0 0-1.414 1.414L13 20.414z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export function IconResources(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconWidth}
      height={iconHeight}
      viewBox="0 0 48 48"
      {...props}
    >
      <defs>
        <mask id="ipSFolderOne0">
          <g fill={iconColor}>
            <path
              fill="white"
              stroke={iconColor}
              strokeLinejoin="round"
              strokeWidth={4}
              d="M5 6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v36a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z"
            ></path>
            <circle cx={11} cy={35} r={2} fill="#000"></circle>
            <path
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={4}
              d="M11 11v14"
            ></path>
            <path
              fill="white"
              stroke={iconColor}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={4}
              d="m23.978 9.756l10.06-2.515a1 1 0 0 1 1.21.72l7.5 29.063a1 1 0 0 1-.725 1.22l-10.06 2.515a1 1 0 0 1-1.211-.72l-7.5-29.063a1 1 0 0 1 .726-1.22"
            ></path>
            <circle cx={35} cy={32} r={2} fill="#000"></circle>
            <path
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={4}
              d="m31 16l2.5 10"
            ></path>
          </g>
        </mask>
      </defs>
      <path
        fill={iconColor}
        d="M0 0h48v48H0z"
        mask="url(#ipSFolderOne0)"
      ></path>
    </svg>
  );
}

export function IconAdmin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconWidth}
      height={iconHeight}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill={iconColor}
        d="M12 14v8H4a8 8 0 0 1 8-8m0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6s6 2.685 6 6s-2.685 6-6 6m9 4h1v5h-8v-5h1v-1a3 3 0 1 1 6 0zm-2 0v-1a1 1 0 1 0-2 0v1z"
      ></path>
    </svg>
  );
}
