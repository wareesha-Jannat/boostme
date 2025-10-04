import SessionWrapper from "./SessionWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import ReactQueryProvider from "./ReactQueryProvider";
import { auth } from "@/lib/auth";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: {
    template: "%s | BoostMe ",
    default: "BoostMe",
  },
  description: "Fund your favorite creaters",
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
