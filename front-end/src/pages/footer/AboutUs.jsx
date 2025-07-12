import { IoExtensionPuzzleSharp } from "react-icons/io5";

const AboutUs = () => {
	return (
		<div className="relative flex min-h-[70vh] w-full max-w-8xl mx-auto px-8 py-16 bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 rounded-3xl shadow-xl">
			<div className="flex flex-col items-center w-full">
				<h1 className="text-4xl font-extrabold text-pink-600 mb-6 drop-shadow-lg">
					Despre Noi
				</h1>
				<p className="text-lg text-gray-700 font-medium mb-4 text-center max-w-3xl">
					Din dorința de a veni în ajutorul pasionaților de puzzle-uri, am creat
					această platformă dedicată celor care iubesc provocările și relaxarea
					oferită de asamblarea pieselor.
				</p>
				<p className="text-lg text-blue-700 font-semibold mb-4 text-center max-w-3xl">
					Fie că ești un începător sau un expert, aici vei găsi o gamă variată
					de puzzle-uri care să îți pună la încercare abilitățile și să îți
					aducă bucurie.
				</p>
				<p className="text-lg text-green-700 font-semibold text-center max-w-3xl">
					Ne dorim să fim partenerul tău de încredere în această călătorie
					captivantă prin lumea puzzle-urilor.
					<br />
					Fie că vinzi un puzzle unic sau cauți să îți completezi colecția,
					platforma noastră este locul ideal pentru a te conecta cu alți
					pasionați și a descoperi cele mai interesante oferte.
				</p>
				<div className="mt-4 flex gap-4">
					<IoExtensionPuzzleSharp
						className="size-8"
						style={{ color: "pink", transform: "rotate(210deg)" }}
					/>
					<IoExtensionPuzzleSharp
						className="size-8"
						style={{ color: "yellow-300", transform: "rotate(90deg)" }}
					/>
					<IoExtensionPuzzleSharp
						className="size-8"
						style={{ color: "blue", transform: "rotate(30deg)" }}
					/>
					<IoExtensionPuzzleSharp
						className="size-8"
						style={{ color: "brown", transform: "rotate(80deg)" }}
					/>
				</div>
			</div>
		</div>
	);
};

export default AboutUs;
