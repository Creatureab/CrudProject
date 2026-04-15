import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Memories",
  description: "Memories app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
