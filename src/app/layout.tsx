import "./globals.css";

export const metadata = {
  title: "CUTM-GPT | Centurion University",
  description: "Intelligent AI assistant powered by Centurion University of Management and Technology",
  keywords: "AI, chatbot, Centurion University, education, technology",
  authors: [{ name: "Devsomeware" }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
  },
  themeColor: '#fbbf24',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'CUTM-GPT',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
        {/* Mobile-specific meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Prevent zoom on input focus for iOS */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        
        {/* Favicon for different devices */}
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        
        {/* Prevent flash of unstyled content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            html, body {
              height: 100%;
              height: 100dvh;
              margin: 0;
              padding: 0;
              overflow: hidden;
              background: #fefce8;
            }
            
            /* Prevent zoom on input focus */
            @media screen and (max-width: 768px) {
              input[type="text"],
              input[type="email"], 
              input[type="password"],
              textarea {
                font-size: 16px !important;
                transform: translateZ(0);
              }
            }
            
            /* Loading state */
            .loading-container {
              position: fixed;
              inset: 0;
              background: linear-gradient(135deg, #fefce8, #fef3c7);
              z-index: 9999;
            }
          `
        }} />
      </head>
      <body className="font-sans antialiased h-full overflow-hidden mobile-safe-area">
        <div id="root" className="h-full">
          {children}
        </div>
      </body>
    </html>
  );
}