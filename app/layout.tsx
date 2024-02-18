import Footer from "@/components/Footer";
import LenisInstantiator from "@/components/LenisInstantiator";
import Navbar from "@/components/Navbar";
import clsx from "clsx";
import { GeistSans } from "geist/font/sans";
import { League_Spartan } from "next/font/google";
import "./globals.css";

const leagueSpartan = League_Spartan({
  weight: ["100", "400", "600", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const colors = ["default", "red", "dark", "grey", "navy"];

  const randomNumber = Math.floor(Math.random() * colors.length);

  return (
    <html lang="en">
      <LenisInstantiator>
        <body className={clsx([colors[randomNumber], GeistSans.className])}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </LenisInstantiator>
    </html>
  );
}
