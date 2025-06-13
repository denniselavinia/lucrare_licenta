// import React from 'react'
// import Models from './Models'
// import Filter from '../puzzles/Filter'

// const Home = () => {
//   return (
//     <div className="flex flex-col justify-center items-center min-h-[70vh]">
//       <div className="w-full max-w-5xl">
//         <Filter/>
//         <Models/>
//       </div>
//     </div>
//   )
// }

// export default Home

import React from 'react'
import Models from './Models'
import Filter from '../puzzles/Filter'
import { useFetchPuzzlesQuery } from '../../redux/features/puzzles/puzzlesAPI'
import AISearch from '../../AI/searchWithAI'

const Home = () => {
  const { data: puzzles = [], isLoading, isError } = useFetchPuzzlesQuery();

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Eroare la încărcarea puzzle-urilor!</div>

  return (
    //<div className="relative flex  min-h-[70vh] w-full max-w-8xl mx-auto px-64 border-2">
    
    <div className="relative flex  min-h-[70vh] w-full max-w-8xl mx-auto px-64">
    {/* Filter column (smaller) */}
    <div className="w-[220px]">
      {/* <Filter puzzles={puzzles} /> */}
    </div>
    {/* Models column (bigger) */}
    <div className="flex-1 flex flex-col justify-center items-center">
      <Models puzzles={puzzles} />
      </div>
      <div className="w-[220px]">
    </div>
  </div>
  )
}

export default Home