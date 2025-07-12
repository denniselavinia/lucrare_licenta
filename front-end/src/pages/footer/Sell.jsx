import React from "react";
import { IoExtensionPuzzleSharp } from "react-icons/io5";

const Sell = () => {
	return (
		<div className="relative flex min-h-[70vh] w-full max-w-8xl mx-auto px-8 py-16 bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 rounded-3xl shadow-xl">
			<div className="flex flex-col items-center w-full">
				<h1 className="text-4xl font-extrabold text-orange-600 mb-6 drop-shadow-lg">
					Cum vând?
				</h1>
				<p className="text-lg text-pink-700 font-medium mb-4 text-center max-w-3xl">
					Procesul de vânzare a puzzle-urilor pe platforma noastră este simplu
					și eficient! Urmează acești pași pentru a-ți lista puzzle-ul spre
					vânzare:
				</p>
				<ol className="text-lg text-purple-700 font-semibold mb-4 text-center max-w-3xl">
					<li>
						<span className="text-pink-500 font-bold">1.</span> Creează un cont
						pe platforma noastră, dacă nu ai deja unul.
					</li>
					<li>
						<span className="text-yellow-500 font-bold">2.</span> Accesează
						secțiunea "Vinde un puzzle" din meniul principal.
					</li>
					<li>
						<span className="text-blue-500 font-bold">3.</span> Completează
						formularul de vânzare cu detalii despre puzzle-ul tău: numele,
						descrierea, prețul și starea acestuia.
					</li>
					<li>
						<span className="text-green-500 font-bold">4.</span> Încarcă
						fotografii clare și atractive ale puzzle-ului pentru a atrage
						potențialii cumpărători.
					</li>
					<li>
						<span className="text-pink-500 font-bold">5.</span> Publică anunțul
						și așteaptă să fii contactat de cumpărători interesați.
					</li>
					<li>
						<span className="text-yellow-500 font-bold">6.</span> După ce ai
						vândut puzzle-ul, asigură-te că îl livrezi în condiții excelente și
						la timp.
					</li>
				</ol>
				<div className="mt-4 flex gap-4">
					<IoExtensionPuzzleSharp
						className="size-8"
						style={{ color: "green", transform: "rotate(210deg)" }}
					/>
					<IoExtensionPuzzleSharp
						className="size-8"
						style={{ color: "blue", transform: "rotate(90deg)" }}
					/>
					<IoExtensionPuzzleSharp
						className="size-8"
						style={{ color: "purple", transform: "rotate(30deg)" }}
					/>
					<IoExtensionPuzzleSharp
						className="size-8"
						style={{ color: "red", transform: "rotate(80deg)" }}
					/>
				</div>
			</div>
		</div>
	);
};

export default Sell;
