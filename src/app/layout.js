"user client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./component/Nav";
import Providers from "./component/Providers"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Raihan Interactive Shop",
  description: "Generated Shop app by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <Nav /> 
          {children}
        </Providers>
      </body>
    </html>
  );
}
