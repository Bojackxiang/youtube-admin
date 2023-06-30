import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin",
  description: "Admin dashboard for the site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={inter.className}>{children}</body>
      </ClerkProvider>
    </html>
  );
}
