import React from "react";
import { IoExtensionPuzzleSharp } from "react-icons/io5";

const Delivery = () => {
	return (
		<div className="relative flex min-h-[70vh] w-full max-w-8xl mx-auto px-8 py-16 bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 rounded-3xl shadow-xl">
			<div className="flex flex-col items-center w-full">
				<h1 className="text-4xl font-extrabold text-purple-600 mb-6 drop-shadow-lg">
					Livrare
				</h1>
				<p className="text-lg text-yellow-700 font-medium mb-4 text-center max-w-3xl">
					Livrarea puzzle-urilor comandate se face direct la ușa ta,
					asigurându-ne că ajung în cele mai bune condiții și la timp.
				</p>
				<p className="text-lg text-green-700 font-semibold mb-4 text-center max-w-3xl">
					Curierii noștri sunt pregătiți să îți aducă bucuria puzzle-ului ales,
					iar tu nu trebuie decât să te relaxezi și să aștepți sosirea acestuia.
				</p>
				<p className="text-lg text-orange-700 font-semibold text-center max-w-3xl">
					Tarife curier:
					<ul className="list-disc list-inside text-lg text-blue-700 font-medium mb-4 text-center max-w-3xl">
						<li>
							<span className="text-pink-500 font-bold">1.</span> Pentru comenzi
							în Timișoara, livrarea este gratuită.
						</li>
						<li>
							<span className="text-yellow-500 font-bold">2.</span> Pentru
							livrări în afara orașului, se aplică o taxă de livrare de 20 lei.
						</li>
						<li>
							<span className="text-blue-500 font-bold">3.</span> Pentru
							comenzile cu valoare totală de peste 200 lei, livrarea este
							gratuită indiferent de destinație.
						</li>
					</ul>
				</p>
				<div className="mt-4 flex gap-4">
					<IoExtensionPuzzleSharp
						className="size-8"
						style={{ color: "green", transform: "rotate(210deg)" }}
					/>
					<IoExtensionPuzzleSharp
						className="size-8"
						style={{ color: "pink", transform: "rotate(90deg)" }}
					/>
					<IoExtensionPuzzleSharp
						className="size-8"
						style={{ color: "orange", transform: "rotate(30deg)" }}
					/>
					<IoExtensionPuzzleSharp
						className="size-8"
						style={{ color: "rd", transform: "rotate(80deg)" }}
					/>
				</div>
			</div>
		</div>
	);
};

export default Delivery;
