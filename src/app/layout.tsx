import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "JUERP | JUONE Administration",
    template: "%s | JUERP",
  },
  description:
    "JUERP administration and governance platform for the JUONE ecosystem.",
  keywords: [
    "JUERP",
    "JUONE",
    "Administration",
    "ERP",
    "Governance",
  ],
  robots: {
    index: false,
    follow: false,
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta
          name="theme-color"
          content="#F57C00"
        />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        <meta
          name="application-name"
          content="JUERP"
        />

        <meta
          name="mobile-web-app-capable"
          content="yes"
        />

        <meta
          name="apple-mobile-web-app-capable"
          content="yes"
        />

        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="default"
        />

        <meta
          name="apple-mobile-web-app-title"
          content="JUERP"
        />
      </head>

      <body>
        {children}
      </body>
    </html>
  );
}