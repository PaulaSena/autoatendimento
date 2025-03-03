import "./globals.css";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";



const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lysena",
  description: "Mininu lindu!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
<h1>Layout</h1>
      </body>
    </html>
  );
}
