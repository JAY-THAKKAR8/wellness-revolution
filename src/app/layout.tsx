import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Wellness Revolution | Premium Gym in Akota, Vadodara",
  description:
    "Strength, HIIT, boxing, yoga and personal training in Akota, Vadodara. Real coaches, serious equipment. Book your free trial.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#131313",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
