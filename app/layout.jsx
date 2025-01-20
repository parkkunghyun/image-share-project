import { Outfit, Ovo } from "next/font/google";
import "./globals.css";
import ReactQueryClientProvider  from "../app/config/ReactQueryClientProvider";
import Header from "./components/Header";

const outfit = Outfit({
  subsets: ["latin"], weight: ["400", "500", "600", "700"]
});

const ovo = Ovo({
  subsets: ["latin"], weight: ["400"]
});

export const metadata = {
  title: "Portfolio - 박경현",
  description: "박경현의 포트폴리오입니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth ">
      <body
        className={`${outfit.className} ${ovo.className} dark:bg-darkTheme dark:text-white antialiased leading-8 overflow-x-hidden`}
      >
        <ReactQueryClientProvider >
          <div className="w-full bg-gradient-to-b from-gray-500 to-white  h-screen">
            <Header/>
            {children}
            
          </div>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
