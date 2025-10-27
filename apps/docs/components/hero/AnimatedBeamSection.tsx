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
        "z-10 flex size-12 items-center justify-center rounded-full border-2 dark:bg-black bg-white  p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
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
    <img src="/unistash_logo.png" alt="Unistash Logo" className="md:size-8  " />
  ),
  zustand: () => <img src="/zustand-original.svg" alt="Zustand Logo" />,
  jotai: () => (
    <img src="/jotai-mascot.png" alt="Jotai Logo" className=" md:size-6 " />
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
    <img
      src="/recoil-js.svg"
      alt="Recoil Logo"
      className="md:size-6 rounded-full"
    />
  ),
  valtio: () => (
    <img
      src="/valtio.png"
      alt="Valtio Logo"
      className=" rounded-full dark:border dark:border-white"
    />
  ),
};
