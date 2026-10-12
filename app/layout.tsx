import type { Metadata, Viewport } from "next";
import { Geist, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const themeBoot = `try{var t=localStorage.getItem("aura-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t);}catch(e){}`;

export const metadata: Metadata = {
  title: "AuraClean — Hotel-Grade Home Sanctuary",
  description:
    "Premium eco-conscious home cleaning and deep sanitization. Hospital-grade clean, plant-derived solutions, insured specialists, and a 5-star finish.",
  openGraph: {
    title: "AuraClean — Hotel-Grade Home Sanctuary",
    description:
      "Your living space, restored to zero. Botanical chemistry, hotel discipline, and a clean you can book in a minute.",
    type: "website",
    url: "https://kirtimandutta.github.io/cleaningcompany/",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0F17",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-canvas font-sans text-ink antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
          <div className="absolute -top-24 right-[-8%] h-[28rem] w-[28rem] rounded-full bg-[#10B981]/15 blur-3xl" />
          <div className="absolute bottom-[-6rem] left-[-10%] h-[22rem] w-[22rem] rounded-full bg-[#059669]/10 blur-3xl" />
        </div>
        {children}
      </body>
    </html>
  );
}
