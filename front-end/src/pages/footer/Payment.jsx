import React from 'react'
import { IoExtensionPuzzleSharp } from 'react-icons/io5'

const Payment = () => {
  return (
     <div className="relative flex min-h-[70vh] w-full max-w-8xl mx-auto px-8 py-16 bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 rounded-3xl shadow-xl">
          <div className="flex flex-col items-center w-full">
            <h1 className="text-4xl font-extrabold text-orange-600 mb-6 drop-shadow-lg">Modalități de plată</h1>
            <p className="text-lg text-green-700 font-medium mb-4 text-center max-w-3xl">
          Pentru moment, singura modalitate de plată disponibilă este plata în numerar la livrare.
        </p>
        <p className="text-lg text-yellow-700 font-medium mb-4 text-center max-w-3xl">
          Aceasta este o opțiune convenabilă și sigură, care îți permite să plătești doar atunci când primești puzzle-ul dorit.
            </p>
             <div className="mt-4 flex gap-4">
                <IoExtensionPuzzleSharp className='size-8' style={{ color: "orange", transform: "rotate(210deg)" }} />
                <IoExtensionPuzzleSharp className='size-8' style={{ color: "blue", transform: "rotate(90deg)" }} />
                <IoExtensionPuzzleSharp className='size-8' style={{ color: "gray", transform: "rotate(30deg)" }} />
                <IoExtensionPuzzleSharp className='size-8' style={{ color: "pink", transform: "rotate(80deg)" }} />
              </div>
          </div>
        </div>
  )
}

export default Payment