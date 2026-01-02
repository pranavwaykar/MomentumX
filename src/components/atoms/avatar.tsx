"use client";

import Image from "next/image";

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  const [a, b] = [parts[0] || "", parts[1] || ""];
  return (a[0] || "").toUpperCase() + (b[0] || "").toUpperCase();
}

function colorFromString(s: string) {
  const colors = [
    "bg-blue-600",
    "bg-green-600",
    "bg-amber-600",
    "bg-purple-600",
    "bg-pink-600",
    "bg-teal-600",
    "bg-red-600",
    "bg-cyan-600",
  ];
  let hash = 0;
  for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) | 0;
  const idx = Math.abs(hash) % colors.length;
  return colors[idx];
}

export function Avatar({
  name,
  src,
  size = 28,
  className,
}: {
  name: string;
  src?: string;
  size?: number;
  className?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={size}
        height={size}
        className={`rounded-full ${className || ""}`}
      />
    );
  }
  const bg = colorFromString(name);
  return (
    <div
      className={`rounded-full ${bg} text-white flex items-center justify-center text-xs ${
        className || ""
      }`}
      style={{ width: size, height: size }}>
      {initials(name) || "?"}
    </div>
  );
}
