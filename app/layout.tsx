import type { Metadata, Viewport } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { AppShell } from "@/components/AppShell";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { SITE_URL } from "@/lib/site";
import "../styles/globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DevStack — Developer Utility Suite",
    template: "%s · DevStack",
  },
  description:
    "JSON formatlama, kod dönüştürme, metin şifreleme ve veri üretimi gibi geliştirici araçlarını tek bir hızlı ve güvenli arayüzde toplayan, tamamen istemci taraflı çalışan araç seti.",
  manifest: "/manifest.json",
  verification: {
    google: "Ch7amv6GZ3vGgshGxSsQiQCpMx5iqJ0VxXOa30TSTHk",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0D12",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="h-full bg-app-decor">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <LanguageProvider>
            <AppShell>{children}</AppShell>
          </LanguageProvider>
        </ThemeProvider>
        <ServiceWorkerRegistration />
        <Analytics />
      </body>
    </html>
  );
}
