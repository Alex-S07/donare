import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Donare",
  description: "Seek Donations and give donations",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
