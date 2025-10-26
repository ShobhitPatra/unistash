"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "../ui/animated-beam";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex md:size-12 size-2 items-center justify-center rounded-full border-2 dark:bg-black bg-white  p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const chatgptRef = useRef<HTMLDivElement>(null);
  const zustandRef = useRef<HTMLDivElement>(null);
  const jotaiRef = useRef<HTMLDivElement>(null);
  const reduxRef = useRef<HTMLDivElement>(null);
  const recoilRef = useRef<HTMLDivElement>(null);
  const valtioRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex w-full items-center justify-center overflow-hidden  md:p-10 p-1"
      ref={containerRef}
    >
      <div className="flex size-full max-w-4xl items-center justify-between md:gap-32 gap-2">
        {/* Left - User */}
        <div className="flex items-center">
          <Circle ref={userRef} className="md:size-16">
            <Icons.user />
          </Circle>
        </div>

        {/* Middle - ChatGPT */}
        <div className="flex items-center">
          <Circle ref={chatgptRef} className="md:size-20">
            <Icons.chatgpt />
          </Circle>
        </div>

        {/* Right - State Management Libraries in semicircle */}
        <div className="relative w-64 h-64">
          <Circle
            ref={zustandRef}
            className="absolute md:size-14 top-0 left-1/2 -translate-x-1/2"
          >
            <Icons.zustand />
          </Circle>
          <Circle ref={jotaiRef} className="absolute md:size-14 top-8 right-4">
            <Icons.jotai />
          </Circle>
          <Circle
            ref={reduxRef}
            className="absolute md:size-14 top-1/2 -translate-y-1/2 right-0"
          >
            <Icons.redux />
          </Circle>
          <Circle
            ref={recoilRef}
            className="absolute md:size-14 bottom-8 right-4"
          >
            <Icons.recoil />
          </Circle>
          <Circle
            ref={valtioRef}
            className="absolute md:size-14 bottom-0 left-1/2 -translate-x-1/2"
          >
            <Icons.valtio />
          </Circle>
        </div>
      </div>

      {/* Flow: User → ChatGPT → User */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userRef}
        toRef={chatgptRef}
        duration={3}
      />

      {/* Flow: ChatGPT ↔ State Management Libraries (bidirectional) */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={chatgptRef}
        toRef={zustandRef}
        curvature={-30}
        duration={3}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={chatgptRef}
        toRef={jotaiRef}
        curvature={-15}
        duration={3}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={chatgptRef}
        toRef={reduxRef}
        duration={3}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={chatgptRef}
        toRef={recoilRef}
        curvature={15}
        duration={3}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={chatgptRef}
        toRef={valtioRef}
        curvature={30}
        duration={3}
      />
    </div>
  );
}

const Icons = {
  user: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="8" r="4" fill="#4F46E5" />
      <path
        d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21H4V20Z"
        fill="#4F46E5"
      />
    </svg>
  ),
  chatgpt: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
        fill="#10A37F"
      />
    </svg>
  ),
  zustand: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M90 15C48.1 15 15 48.1 15 90C15 131.9 48.1 165 90 165C131.9 165 165 131.9 165 90C165 48.1 131.9 15 90 15Z"
        fill="#453E3E"
      />
      <path d="M120 75L90 105L60 75H120Z" fill="#FEFEFE" />
    </svg>
  ),
  jotai: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="50" r="25" fill="#000" />
      <rect x="85" y="75" width="30" height="75" rx="15" fill="#000" />
      <circle cx="100" cy="165" r="15" fill="#000" />
    </svg>
  ),
  redux: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M65.6 65.4c2.9-.3 5.1-2.8 5-5.8-.1-3-2.6-5.4-5.6-5.4h-.2c-3.1.1-5.5 2.7-5.4 5.8.1 1.5.7 2.8 1.6 3.7-3.4 6.7-8.6 11.6-16.4 15.7-5.3 2.8-10.8 3.8-16.3 3.1-4.5-.6-8-2.6-10.2-5.9-3.2-4.9-3.5-10.2-.8-15.5 1.9-3.8 4.9-6.6 6.8-8-.4-1.3-1-3.5-1.3-5.1-14.5 10.5-13 24.7-8.6 31.4 3.3 5 10 8.1 17.4 8.1 2 0 4-.2 6-.7 12.8-2.5 22.5-10.1 28-21.4z"
        fill="#764ABC"
      />
      <path
        d="M83.2 53c-7.6-8.9-18.8-13.8-31.6-13.8H50c-.9-1.8-2.8-3-4.9-3h-.2c-3.1.1-5.5 2.7-5.4 5.8.1 3 2.6 5.4 5.6 5.4h.2c2.2-.1 4.1-1.5 4.9-3.4H52c7.6 0 14.8 2.2 21.3 6.5 5 3.3 8.6 7.6 10.6 12.8 1.7 4.2 1.6 8.3-.2 11.8-2.8 5.3-7.5 8.2-13.7 8.2-4 0-7.8-1.2-9.8-2.1-1.1 1-3.1 2.6-4.5 3.6 4.3 2 8.7 3.1 12.9 3.1 9.6 0 16.7-5.3 19.4-10.6 2.9-5.8 2.7-15.8-4.8-24.3z"
        fill="#764ABC"
      />
      <path
        d="M32.4 67.1c.1 3 2.6 5.4 5.6 5.4h.2c3.1-.1 5.5-2.7 5.4-5.8-.1-3-2.6-5.4-5.6-5.4h-.2c-.2 0-.5 0-.7.1-4.1-6.8-5.8-14.2-5.2-22.2.4-6 2.4-11.2 5.9-15.5 2.9-3.7 8.5-5.5 12.3-5.6 10.6-.2 15.1 13 15.4 18.3 1.3.3 3.5 1 5 1.5-1.2-16.2-11.2-24.6-20.8-24.6-9 0-17.3 6.5-20.6 16.1-4.6 12.8-1.6 25.1 4 34.8-.5.7-.8 1.8-.7 2.9z"
        fill="#764ABC"
      />
    </svg>
  ),
  recoil: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="35" r="8" fill="#3578E5" />
      <circle cx="30" cy="65" r="8" fill="#3578E5" />
      <circle cx="70" cy="65" r="8" fill="#3578E5" />
      <line x1="50" y1="43" x2="35" y2="60" stroke="#3578E5" strokeWidth="3" />
      <line x1="50" y1="43" x2="65" y2="60" stroke="#3578E5" strokeWidth="3" />
      <line x1="30" y1="73" x2="70" y2="73" stroke="#3578E5" strokeWidth="3" />
    </svg>
  ),
  valtio: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="100"
        cy="100"
        r="60"
        stroke="#FF6B6B"
        strokeWidth="8"
        fill="none"
      />
      <circle cx="100" cy="70" r="15" fill="#FF6B6B" />
      <circle cx="75" cy="115" r="15" fill="#FF6B6B" />
      <circle cx="125" cy="115" r="15" fill="#FF6B6B" />
    </svg>
  ),
};
