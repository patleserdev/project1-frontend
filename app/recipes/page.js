import Form from "../components/Form.js";
import List from "../components/List.js";

export const metadata = {
  title: 'Site de recettes - Recettes',
  description: '...',
}

export default function Recipes() {
  const schema = "recipes";

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-start min-h-screen p-8 pb-20 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full flex flex-col items-center justify-center">
        <h1 className="text-2xl underline">Recettes :</h1>

        <Form schema={schema} />
        <List schema={schema} />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
