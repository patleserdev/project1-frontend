import localFont from "next/font/local";
import "./styles/globals.css";
import StoreProvider from "./StoreProvider"
import Navbar from "./components/Navbar";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Site de recettes",
  description: "...",
};


export default function RootLayout({ children }) {

  return (
    
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <StoreProvider>
       <Navbar/>

        {children}
        </StoreProvider>
      </body>
    </html>
    
  );
}
