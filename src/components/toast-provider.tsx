"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Toast = { id: number; message: string; type?: "success" | "error" };

type ToastContextValue = {
  show: (message: string, type?: "success" | "error") => void;
};

const ToastContext = createContext<ToastContextValue>({ show: () => {} });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mounted, setMounted] = useState(false);

  const show = (message: string, type: "success" | "error" = "success") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3000);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {mounted
        ? createPortal(
            <div className="fixed bottom-4 right-4 z-[60] space-y-2">
              {toasts.map((t) => (
                <div
                  key={t.id}
                  className={`rounded-md border px-4 py-2 shadow ${
                    t.type === "success"
                      ? "bg-green-600 text-white border-green-700"
                      : "bg-red-600 text-white border-red-700"
                  }`}>
                  {t.message}
                </div>
              ))}
            </div>,
            document.body
          )
        : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
