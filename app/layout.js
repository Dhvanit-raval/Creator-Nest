import { Geist, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "CreatorNest – Fund Your Creative Journey",
  description: "A crowdfunding platform for creators. Get funded by your fans and followers. Start now!",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >

      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>

      <body
        className="min-h-screen flex flex-col text-zinc-100 bg-zinc-950"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
        }}>

        <SessionWrapper>
          <Navbar />
          <main className="flex-1 overflow-hidden">
            <div className="mx-auto w-full max-w-7xl px-5 py-12">
              {children}
            </div>
          </main>
          <Footer />
        </SessionWrapper>

      </body>

    </html>
  );
}
