"use client";

import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        style: {
          background: "var(--toast-bg, #1a1a1a)",
          color: "var(--toast-color, #ffffff)",
          border: "1px solid var(--toast-border, #2a2a2a)",
        },
      }}
    />
  );
};

export default ToastProvider;