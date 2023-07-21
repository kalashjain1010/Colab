'use client'

import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, disabled = false, children, type = "button", ...props },
    ref
  ) => {
    return (
      <button
        disabled={disabled}
        className={twMerge(
          "p-4 border border-transparent rounded-3xl disabled:cursor-not-allowed disabled:opacity-50 text-black hover:opacity-70 transition font-semibold",
          className
        )}
        type={type}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
export default Button;
