import React from "react";

const Contact = () => {
	return (
		<div className="relative flex justify-end items-center gap-10">
			<ul className="flex flex-row md:flex-col gap-1 mb-5 text-left">
				<li className="hover:text-primary" style={{ fontSize: "14px" }}>
					Contact
				</li>
				<li className="hover:text-primary" style={{ fontSize: "12px" }}>
					Telefon: 0720000000
				</li>
				<li className="hover:text-primary" style={{ fontSize: "12px" }}>
					Adresa e-mail: puzzles@gmail.com
				</li>
			</ul>
		</div>
	);
};

export default Contact;
