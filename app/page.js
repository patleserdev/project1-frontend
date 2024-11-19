import { Metadata } from 'next'

 
export const metadata = {
  title: 'Site de recettes - Accueil',
  description: '...',
}
 


export default function Home() {
  return (
  

    
   
    <div className="grid grid-rows-[20px_1fr_20px]  min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="">

        <ul>
          Site de démo pour travailler sur les formulaires dynamiques en React
          <li>En cours : création de l'interface liée à un fichier json de structure</li>
          <li>Une fois le formData dynamique fonctionnel , je ferais les tests de fetch</li>
        </ul>
        
    
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
       
      </footer>
    </div>
   
  );
}
