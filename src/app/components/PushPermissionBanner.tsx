"use client";

import { useState, useEffect } from "react";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import LocationPermissionModal, {
  type LocationChoice,
} from "./LocationPermissionModal";

const PUSH_STORAGE_KEY = "pushBannerDismissed";

// Push в браузере на iPhone недоступен; в установленной PWA (standalone) — поддерживается с iOS 16.4+
function isPushUnsupported(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (!isIOS) return false;
  const isStandalone =
    typeof window !== "undefined" &&
    (window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true);
  return !isStandalone;
}

type ActiveModal = "location" | "push" | null;

export default function PushPermissionBanner() {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const { isSupported, permission, subscribe, isLoading } = usePushNotifications();

  const pushNotDismissed = () =>
    typeof window !== "undefined" && !localStorage.getItem(PUSH_STORAGE_KEY);

  const shouldShowPush = () =>
    pushNotDismissed() &&
    !isPushUnsupported() &&
    isSupported &&
    permission === "default";

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Геолокацию на старте не запрашиваем: мешает рекламным превью и замедляет первый экран.
    // При необходимости вернуть: if (!getLocationModalDismissed()) { setActiveModal("location"); return }
    const t = setTimeout(() => {
      if (shouldShowPush()) {
        setActiveModal("push");
      } else {
        setActiveModal(null);
      }
    }, 0);
    return () => clearTimeout(t);
  }, [isSupported, permission]);

  const handleLocationChoice = (_choice?: LocationChoice) => {
    if (pushNotDismissed() && !isPushUnsupported()) {
      setActiveModal("push");
    } else {
      setActiveModal(null);
    }
  };

  const handlePushAllow = async () => {
    try {
      const result = await subscribe();
      if (result) {
        // Успешная подписка — закрываем и больше не показываем
        localStorage.setItem(PUSH_STORAGE_KEY, "true");
        setActiveModal(null);
      } else {
        // Ошибка (например 503) — всё равно закрываем модалку, чтобы не зависала
        localStorage.setItem(PUSH_STORAGE_KEY, "true");
        setActiveModal(null);
      }
    } catch {
      localStorage.setItem(PUSH_STORAGE_KEY, "true");
      setActiveModal(null);
    }
  };

  const handlePushDismiss = () => {
    localStorage.setItem(PUSH_STORAGE_KEY, "true");
    setActiveModal(null);
  };

  return (
    <>
      <LocationPermissionModal
        isOpen={activeModal === "location"}
        onClose={handleLocationChoice}
        onChoice={handleLocationChoice}
      />

      {activeModal === "push" && (
        <div
          className="fixed z-[60] top-3 left-4 right-4 md:left-4 md:right-auto md:w-96 animate-modal-in rounded-2xl overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="push-modal-title"
          aria-describedby="push-modal-desc"
        >
          <div
            className="rounded-2xl overflow-hidden border border-white/10 p-6"
            style={{
              background: "linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)",
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div className="flex items-start gap-3">
                <div className="shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
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
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h2
                    id="push-modal-title"
                    className="font-bold text-white text-lg"
                  >
                    Включите уведомления
                  </h2>
                  <p
                    id="push-modal-desc"
                    className="text-white/80 text-sm mt-1"
                  >
                    Получайте новости о статьях, акциях и статусе заявок — не
                    пропустите важное.
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  onClick={handlePushDismiss}
                  className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition-all"
                >
                  Позже
                </button>
                <button
                  type="button"
                  onClick={handlePushAllow}
                  disabled={isLoading}
                  className="flex-1 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-sky-700 shadow-md hover:bg-white/95 disabled:opacity-60 transition-all"
                >
                  {isLoading ? "Подключение…" : "Разрешить"}
                </button>
              </div>
            </div>
          </div>
      )}
    </>
  );
}
