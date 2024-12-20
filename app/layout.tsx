// app/layout.tsx
import './globals.css';
import React from 'react';

export const metadata = {
  title: "AI Corporate Training Platform",
  description: "Choose from AI-driven categories and tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gradient-to-br from-green-50 to-white text-green-900">
        {children}
      </body>
    </html>
  );
}
