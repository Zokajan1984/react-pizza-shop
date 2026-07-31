"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const containerClasses = "min-h-[70vh] flex items-center justify-center px-4";

  const cardClasses = "bg-white rounded-2xl p-8 w-full max-w-sm shadow-sm";

  const inputClasses =
    "w-full border border-gray-200 rounded-xl " +
    "px-4 py-3 text-sm outline-none " +
    "focus:border-[#fe5f1e] transition-colors";

  const buttonClasses =
    "mt-4 w-full bg-[#fe5f1e] hover:bg-[#e2540f] " +
    "disabled:bg-gray-300 transition-colors " +
    "rounded-xl py-3 text-white font-semibold";

  async function handleLogin() {
    if (password.trim().length === 0) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        toast.error("Неверный пароль");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("Ошибка входа:", error);
      toast.error("Не удалось выполнить вход");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className={containerClasses}>
      <div className={cardClasses}>
        <h1 className="text-xl font-bold mb-4 text-center">
          Вход в админ-панель
        </h1>

        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleLogin();
          }}
          placeholder="Введите пароль"
          className={inputClasses}
        />

        <button
          onClick={handleLogin}
          disabled={isSubmitting}
          className={buttonClasses}
        >
          {isSubmitting ? "Проверяем..." : "Войти"}
        </button>
      </div>
    </main>
  );
}
