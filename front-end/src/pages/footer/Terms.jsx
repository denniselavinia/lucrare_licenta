import React from 'react'
import { IoExtensionPuzzleSharp } from 'react-icons/io5'

const Terms = () => {
  return (
    <div className="relative flex min-h-[70vh] w-full max-w-8xl mx-auto px-8 py-16 bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 rounded-3xl shadow-xl">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-6 drop-shadow-lg">Termeni și condiții</h1>
        <p className="text-lg text-purple-700 font-medium mb-4 text-center max-w-5xl">
          Bine ai venit pe platforma noastră dedicată pasionaților de puzzle-uri!
          Înainte de a începe să explorezi și să te bucuri de puzzle-urile noastre, te rugăm să citești cu atenție termenii și condițiile de utilizare.
        </p>
        <p className="text-lg text-orange-700 font-medium mb-4 text-center max-w-5xl">
          Acest document conține informații importante referitoare la drepturile și responsabilitățile tale ca utilizator al platformei noastre.
          Asigură-te că înțelegi și ești de acord cu acești termeni înainte de a utiliza serviciile noastre.
        </p>
        <p className="text-lg text-gray-700 font-medium mb-4 text-center max-w-5xl">
          Dacă ai întrebări sau nelămuriri cu privire la acești termeni și condiții, nu ezita să ne contactezi prin intermediul informațiilor de contact furnizate pe site.
        </p>
        <p className="text-lg text-green-700 font-medium mb-4 text-center max-w-5xl">
          <span className="text-md font-bold text-blue-800 leading-tight ml-1" style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
            The <span className="text-pink-500">New </span><span className="text-purple-500">Life</span> of <span className="text-green-500">Puzzles</span>
          </span> pune la dispoziție o platformă online unde poți vinde și cumpăra puzzle-uri:
          <ol className="text-lg text-blue-700 font-medium mb-4 text-center max-w-5xl">
            <li><span className="text-pink-500 font-bold">1.</span> Procesul de vânzare și cumpărare este simplu și rapid, iar noi ne angajăm să oferim o experiență plăcută și sigură pentru toți utilizatorii noștri.</li>
            <li><span className="text-yellow-500 font-bold">2.</span> Livrarea puzzle-urilor se face prin curier, iar plata se efectuează în numerar la livrare.</li>
            <li><span className="text-yellow-500 font-bold">3.</span> Dacă te-ai răzgândit în privința produselor, returul este contra cost. Va trebui să gasești o firmă de cuerat, cu ajutorul căreia să ne livrezi produsele.
              Acestea trebuie sa fie în starea în care le-ai primit și să fie ambalate corespunzător, pentru tranport.</li>
            <li><span className="text-blue-500 font-bold">4.</span> Datele tale personale vor fi tratate cu confidențialitate și nu vor fi partajate cu terțe părți fără consimțământul tău.</li>
          </ol>
        </p>
        <p className="text-lg text-pink-700 font-medium mb-4 text-center max-w-5xl">
          Ne rezervăm dreptul de a modifica sau actualiza acești termeni și condiții în orice moment, fără notificare prealabilă.
          Este responsabilitatea ta să verifici periodic această pagină pentru a fi la curent cu eventualele modificări.
          Continuarea utilizării platformei noastre după publicarea modificărilor constituie acceptarea acestor modificări.
        </p>
        <div className="mt-4 flex gap-4">
          <IoExtensionPuzzleSharp className='size-8' style={{ color: "red", transform: "rotate(250deg)" }} />
          <IoExtensionPuzzleSharp className='size-8' style={{ color: "blue", transform: "rotate(180deg)" }} />
          <IoExtensionPuzzleSharp className='size-8' style={{ color: "green", transform: "rotate(50deg)" }} />
          <IoExtensionPuzzleSharp className='size-8' style={{ color: "orange", transform: "rotate(3100deg)" }} />
        </div>
      </div>
    </div>
  )
}

export default Terms