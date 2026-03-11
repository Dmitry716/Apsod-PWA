"use client";

import { useState } from "react";

const STORAGE_KEY = "locationPermissionModalDismissed";
const SITE_NAME = "apsod.com";

export type LocationChoice = "allow_on_site" | "allow_once" | "deny" | null;

interface LocationPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChoice: (choice: LocationChoice) => void;
}

export function getLocationModalDismissed(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(STORAGE_KEY) === "true";
}

export function setLocationModalDismissed(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, "true");
}

export default function LocationPermissionModal({
  isOpen,
  onClose,
  onChoice,
}: LocationPermissionModalProps) {
  const [isRequesting, setIsRequesting] = useState(false);

  if (!isOpen) return null;

  const handleAllowOnSite = () => {
    setIsRequesting(true);
    setLocationModalDismissed();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => onChoice("allow_on_site"),
        () => onChoice("allow_on_site"),
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
      );
    } else {
      onChoice("allow_on_site");
    }
    setTimeout(() => setIsRequesting(false), 500);
  };

  const handleAllowOnce = () => {
    setIsRequesting(true);
    setLocationModalDismissed();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => onChoice("allow_once"),
        () => onChoice("allow_once"),
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 }
      );
    } else {
      onChoice("allow_once");
    }
    setTimeout(() => setIsRequesting(false), 500);
  };

  const handleDeny = () => {
    setLocationModalDismissed();
    onChoice("deny");
  };

  return (
    <div
      className="fixed z-[60] top-3 left-4 right-4 md:left-4 md:right-auto md:w-96 animate-modal-in rounded-2xl shadow-xl overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-modal-title"
      aria-describedby="location-modal-desc"
    >
      <div
        className="rounded-2xl border border-white/10 overflow-hidden p-6"
        style={{
          background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div className="relative pb-1">
          <button
            type="button"
            onClick={handleDeny}
            className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Закрыть"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2
            id="location-modal-title"
            className="pr-8 text-white font-semibold text-base sm:text-lg"
          >
            {SITE_NAME} запрашивает разрешение на:
          </h2>
        </div>

        <div className="pb-2 flex items-start gap-3">
          <div className="shrink-0 w-10 h-10 rounded-full bg-slate-600/80 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <p id="location-modal-desc" className="text-slate-300 text-sm sm:text-base pt-0.5">
            доступ к данным о вашем местоположении
          </p>
        </div>

        <div className="pt-3 space-y-2">
          <button
            type="button"
            onClick={handleAllowOnSite}
            disabled={isRequesting}
            className="w-full py-3 px-4 rounded-xl text-white text-sm font-medium transition-colors disabled:opacity-60"
            style={{ background: "rgba(30, 41, 59, 0.9)", border: "1px solid rgba(71, 85, 105, 0.5)" }}
          >
            Разрешить, когда я на сайте
          </button>
          <button
            type="button"
            onClick={handleAllowOnce}
            disabled={isRequesting}
            className="w-full py-3 px-4 rounded-xl text-white text-sm font-medium transition-colors disabled:opacity-60"
            style={{ background: "rgba(30, 41, 59, 0.9)", border: "1px solid rgba(71, 85, 105, 0.5)" }}
          >
            Разрешить в этот раз
          </button>
          <button
            type="button"
            onClick={handleDeny}
            className="w-full py-3 px-4 rounded-xl text-white text-sm font-medium transition-colors hover:bg-slate-600/50"
            style={{ background: "rgba(30, 41, 59, 0.9)", border: "1px solid rgba(71, 85, 105, 0.5)" }}
          >
            Запретить
          </button>
        </div>
      </div>
    </div>
  );
}
