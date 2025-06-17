import React from 'react'
import { IoExtensionPuzzleSharp } from 'react-icons/io5'

const Command = () => {
  return (
    <div className="relative flex min-h-[70vh] w-full max-w-8xl mx-auto px-8 py-16 bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 rounded-3xl shadow-xl">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-4xl font-extrabold text-green-600 mb-6 drop-shadow-lg">Cum comand?</h1>
        <p className="text-lg text-gray-700 font-medium mb-4 text-center max-w-3xl">
        Procesul de comandă este simplu și rapid! Urmează acești pași pentru a comanda puzzle-ul dorit:
        </p>
        
        <ol className="text-lg text-blue-700 font-semibold mb-4 text-center max-w-3xl">
          <li><span className="text-pink-500 font-bold">1.</span> Alege puzzle-ul preferat din colecția noastră variată.</li>
          <li><span className="text-yellow-500 font-bold">2.</span> Adaugă-l în coșul de cumpărături.</li>
          <li><span className="text-blue-500 font-bold">3.</span> Verifică detaliile comenzii și asigură-te că ai selectat puzzle-ul dorit.</li>
          <li><span className="text-green-500 font-bold">4.</span> Continuă cu finalizarea comenzii, unde vei introduce informațiile de livrare și platformă.</li>
          <li><span className="text-pink-500 font-bold">5.</span> După confirmarea comenzii, vei primi un e-mail cu detalii despre comandă și estimarea timpului de livrare.</li>
          <li><span className="text-yellow-500 font-bold">6.</span> Așteaptă cu nerăbdare sosirea puzzle-ului tău preferat!</li>
        </ol>
        <div className="mt-4 flex gap-4">
          <IoExtensionPuzzleSharp className='size-8' style={{ color: "green", transform: "rotate(250deg)" }} />
          <IoExtensionPuzzleSharp className='size-8' style={{ color: "red", transform: "rotate(180deg)" }} />
          <IoExtensionPuzzleSharp className='size-8' style={{ color: "orange", transform: "rotate(50deg)" }} />
          <IoExtensionPuzzleSharp className='size-8' style={{ color: "purple", transform: "rotate(3100deg)" }} />
      </div>
    </div>
  </div>
)
  
}

export default Command