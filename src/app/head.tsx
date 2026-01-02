import logo from "@/assets/MomentumX_Logo.png";

export default function Head() {
  return (
    <>
      <link rel="icon" type="image/png" href={logo.src} />
      <link rel="apple-touch-icon" href={logo.src} />
      <meta name="theme-color" content="#111827" />
    </>
  );
}
