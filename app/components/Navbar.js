"use client"
import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function Navbar() {

    const pathname = usePathname()
    const active="p-2 bg-slate-500 text-white" 
    const inactive= "text-slate-500"
console.log(pathname)
  return (

            <header className="p-2">
          <ul className="flex flex-row w-full items-center justify-around">
          <li><Link href="/" passHref legacyBehavior><a className={ pathname === "/" ? active: inactive}>Home</a></Link></li>
          <li><Link href="/icategorie" passHref legacyBehavior><a className={ pathname === "/icategorie" ? active: inactive}>Catégories d'ingrédients</a></Link></li>
          <li><Link href="/ingredients" passHref legacyBehavior><a className={ pathname === "/ingredients" ? active: inactive}>Ingrédients</a></Link></li>
          <li><Link href="/rcategorie" passHref legacyBehavior><a className={ pathname === "/rcategorie" ? active: inactive}>Catégories de recettes</a></Link></li>
          <li><Link href="/recipes" passHref legacyBehavior><a className={ pathname === "/recipes" ? active: inactive}>Recettes</a></Link></li>
          <li><Link href="/mesures" passHref legacyBehavior><a className={ pathname === "/mesures" ? active: inactive}>Mesures</a></Link></li>
          <li><Link href="/regimes" passHref legacyBehavior><a className={ pathname === "/regimes" ? active: inactive}>Régimes</a></Link></li>

          </ul>
          </header>

  );
}
