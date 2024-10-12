import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="">
        
        <ul className="border flex flex-row w-full">Plusieurs pages :
          <li>Catégories d'ingrédients</li>
          <li>Ingrédients</li>
          <li>Catégories de recettes</li>
          <li>Recettes</li>
          <li>Mesures</li>
          <li>Régimes</li>

        </ul>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
       
      </footer>
    </div>
  );
}
