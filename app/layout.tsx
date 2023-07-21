import "./globals.css";
import type { Metadata } from "next";
import { Figtree, Inter } from "next/font/google";
import UserProvider from '@/app/provider/UserProvider'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CoLabHub",
  description: "Find your team",
};

const font = Figtree({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
