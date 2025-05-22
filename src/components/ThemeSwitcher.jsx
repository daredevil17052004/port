"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(null); // Start with null to avoid mismatch

  useEffect(() => {
    if (typeof window !== "undefined") {  // ✅ Ensure it's running in the browser
      const storedTheme = localStorage.getItem("theme") || "light";
      setTheme(storedTheme);

      if (storedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && theme) { // ✅ Prevent server-side access
      document.documentElement.classList.add('transition-colors', 'duration-300');
      localStorage.setItem("theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  // Prevent rendering button before hydration
  if (!theme) return null;

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 text-text rounded-md w-40"
    >
      {theme === "light" ? <Image src="/day" width={50} height={50}/> : <Image src="/night" width={50} height={50}/>}
    </button>
  );
}
