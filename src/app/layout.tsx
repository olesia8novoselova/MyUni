"use client";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { store } from "../store/store";
import { Provider } from "react-redux";

const montserrat = Montserrat({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Provider store={store}>
          <div>{children}</div>
        </Provider>
      </body>
    </html>
  );
}
