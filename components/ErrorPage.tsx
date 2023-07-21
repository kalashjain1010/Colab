"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface ErrorPageProps {
  errorLabel: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorLabel }) => {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.back();
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);
  return <div>{errorLabel}</div>;
};
export default ErrorPage;
