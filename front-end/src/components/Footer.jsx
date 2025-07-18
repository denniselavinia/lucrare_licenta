import puzzlePieces from "../assets/puzzlePieces.png";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import Contact from "../pages/footer/Contact";

const Footer = () => {
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const currentYear = new Date().getFullYear();

	return (
		<footer className="w-full py-6" style={{ backgroundColor: "#FFFDD0" }}>
			<div className="flex justify-between items-center w-full max-w-screen-2xl mx-auto">
				<div className="flex justify-between items-center gap-10">
					<img
						src={puzzlePieces}
						alt="Logo"
						className="png-container mb-5 w-15"
						style={{ height: "70px" }}
					/>
					<ul className="flex flex-row md:flex-col gap-1 mb-5">
						<li>
							<a
								href="/cum-comand"
								className="hover:text-primary"
								style={{ fontSize: "12px" }}
							>
								Cum comand?
							</a>
						</li>
						<li>
							<a
								href="/cum-vand"
								className="hover:text-primary"
								style={{ fontSize: "12px" }}
							>
								Cum vând?
							</a>
						</li>
						<li>
							<a
								href="/livrarea-produselor"
								className="hover:text-primary"
								style={{ fontSize: "12px" }}
							>
								Livrarea produselor
							</a>
						</li>
					</ul>
					<ul className="flex flex-row md:flex-col gap-1 mb-5">
						<li>
							<a
								href="/plata"
								className="hover:text-primary"
								style={{ fontSize: "12px" }}
							>
								Modalități de plată
							</a>
						</li>
						<li>
							<a
								href="/termeni"
								className="hover:text-primary"
								style={{ fontSize: "12px" }}
							>
								Termeni și condiții
							</a>
						</li>
						<li>
							<a
								href="/despre-noi"
								className="hover:text-primary"
								style={{ fontSize: "12px" }}
							>
								Despre noi
							</a>
						</li>
					</ul>
				</div>
				<div className="flex justify-between items-center gap-10">
					<Contact />
				</div>
			</div>
			<div className="relatives flex justify-center items-center">
				<AiOutlineCopyrightCircle className="size-3" />
				<p style={{ fontSize: "12px", color: "#000" }}>
					Copyright {currentYear}
				</p>
				<Link to="/" className="relative" onClick={scrollToTop}>
					<p style={{ fontSize: "12px", color: "blue" }}>
						&nbsp;The new life of puzzles
					</p>
				</Link>
			</div>
		</footer>
	);
};

export default Footer;
