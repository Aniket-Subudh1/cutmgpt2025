import "./globals.css";

export const metadata = {
  title: "CUTM-GPT | Centurion University",
  description: "Intelligent AI assistant powered by Centurion University of Management and Technology",
  keywords: "AI, chatbot, Centurion University, education, technology",
  authors: [{ name: "Devsomeware" }],
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
        
        {/* Optimized mobile viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        
        {/* Mobile-specific meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        
        {/* Prevent FOUC and ensure proper mobile layout */}
        <style dangerouslySetInnerHTML={{
          __html: `
            html, body {
              height: 100%;
              height: 100vh;
              height: 100dvh;
              margin: 0;
              padding: 0;
              overflow: hidden;
              background: #fefce8;
              position: fixed;
              width: 100%;
            }
            
            #root {
              height: 100%;
              height: 100vh;
              height: 100dvh;
              overflow: hidden;
            }
            
            /* Prevent zoom on input focus - Critical for mobile */
            input, textarea {
              font-size: 16px !important;
              transform: translateZ(0);
            }
            
            /* Improve mobile performance */
            * {
              -webkit-tap-highlight-color: transparent;
              -webkit-touch-callout: none;
              -webkit-user-select: none;
              user-select: none;
            }
            
            input, textarea {
              -webkit-user-select: text;
              user-select: text;
            }
          `
        }} />
      </head>
      <body className="font-sans antialiased h-full overflow-hidden">
        <div id="root" className="h-full">
          {children}
        </div>
      </body>
    </html>
  );
}