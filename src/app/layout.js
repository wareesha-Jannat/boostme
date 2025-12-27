import SessionWrapper from "./SessionWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import ReactQueryProvider from "./ReactQueryProvider";
import { auth } from "@/lib/auth";
import Navbar from "@/components/Navbar";

export const metadata = {
   title: {
    default: "BoostMe - Support Creators You Love",
    template: "%s | BoostMe",
  },
  description:
    "BoostMe is a creator support platform where creators showcase their work and supporters contribute through donations.",
  keywords: [
    "support creators",
    "creator funding",
    "creator platform",
    "donate to creators",
    "content creators",
  ],
  metadataBase: new URL("https://boostme-henna.vercel.app/"), // change to your domain
  openGraph: {
    title: "BoostMe – Support Creators You Love",
    description:
      "Discover creators, explore their work, and support them financially.",
    url: "https://boostme-henna.vercel.app",
    siteName: "BoostMe",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 520,
        alt: "BoostMe creator platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <SessionWrapper session={session}>
            <div className="min-h-[100dvh] bg-aurora">
              <Navbar />
              {children}
            </div>

            <ToastContainer />
          </SessionWrapper>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
