
import React from 'react';

export const YarnBallIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 5C9.24 5 7 7.24 7 10s2.24 5 5 5 5-2.24 5-5" />
    <path d="M12 5a7 7 0 0 0-7 7" />
    <path d="M12 15a7 7 0 0 0 7-7" />
    <path d="M12 5a7 7 0 0 1 7 7" />
    <path d="M12 15a7 7 0 0 1-7-7" />
    <path d="M5 10a7 7 0 0 0 7 7" />
    <path d="M19 10a7 7 0 0 0-7 7" />
    <path d="M5 10a7 7 0 0 1 7-7" />
    <path d="M19 10a7 7 0 0 1-7-7" />
  </svg>
);

export const RulerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
    >
        <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L3 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0L12 5.7" />
        <path d="m15 12-2-2" />
        <path d="m2.3 21.7.9-.9" />
        <path d="m8 16-2-2" />
        <path d="m11 13-2-2" />
        <path d="m19 5-2-2" />
    </svg>
);
