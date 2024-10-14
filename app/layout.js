import localFont from "next/font/local";
import "./styles/globals.css";
import Link from "next/link.js";

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
          <header className="p-2">
          <ul className="flex flex-row w-full items-center justify-around">
          <li><Link href="/" passHref legacyBehavior><a>Home</a></Link></li>
          <li><Link href="/icategorie" passHref legacyBehavior><a>Catégories d'ingrédients</a></Link></li>
          <li><Link href="/ingredients" passHref legacyBehavior><a>Ingrédients</a></Link></li>
          <li><Link href="/rcategorie" passHref legacyBehavior><a>Catégories de recettes</a></Link></li>
          <li><Link href="/recipes" passHref legacyBehavior><a>Recettes</a></Link></li>
          <li><Link href="/mesures" passHref legacyBehavior><a>Mesures</a></Link></li>
          <li><Link href="/regimes" passHref legacyBehavior><a>Régimes</a></Link></li>

          </ul>
          </header>

        {children}
      </body>
    </html>
  );
}
