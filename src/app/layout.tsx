// src/app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "CutMGPT - AI Assistant | Centurion University",
  description: "Intelligent AI assistant powered by Centurion University of Management and Technology",
  keywords: "AI, chatbot, Centurion University, education, technology",
  authors: [{ name: "Devsomeware" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}