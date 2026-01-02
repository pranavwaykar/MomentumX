import type { Metadata } from "next";
import "../styles/globals.scss";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/organisms/navbar";
import { AuthProvider } from "@/components/auth-provider";
import logo from "@/assets/MomentumX_Logo.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MomentumX",
  description: "Move from ideas to execution with structured collaboration.",
  icons: {
    icon: [{ url: logo.src, type: "image/png" }],
    shortcut: [{ url: logo.src }],
    apple: [{ url: logo.src }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
