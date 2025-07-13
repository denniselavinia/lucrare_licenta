const { Builder, By, Key, until } = require("selenium-webdriver");

(async function runTests() {
	let driver = await new Builder().forBrowser("chrome").build();

	try {
		// Pornește de la un o sesiune curată
		await driver.get("http://localhost:5173");
		await driver.manage().deleteAllCookies();
		await driver.get("http://localhost:5173");

		let title = await driver.getTitle();
		console.log("Homepage title:", title);

		// Așteaptă să apară bara de navigare
		await driver.wait(until.elementLocated(By.css("nav")), 3000);

		// Se încercă diferite selecții pentru Login
		let loginLink;
		try {
			loginLink = await driver.findElement(By.css('a[title="Autentificare"]'));
		} catch {
			loginLink = await driver.findElement(By.css('a[href="/login"]'));
		}
		await loginLink.click();

		// Se apasă pe butonul de înregistrare
		await driver.wait(until.elementLocated(By.linkText("Register")), 5000);
		await driver.findElement(By.linkText("Register")).click();

		// Se așteapă să apară formularul de înregistrare
		await driver.wait(until.elementLocated(By.name("email")), 5000);
		await driver.findElement(By.name("email")).sendKeys("test@email.com");
		await driver.wait(until.elementLocated(By.name("password")), 5000);
		await driver.findElement(By.name("password")).sendKeys("password");

		// Se trimite formularul de înregistrare
		await driver.wait(
			until.elementLocated(By.xpath("//button[contains(text(),'Register')]")),
			5000
		);
		await driver
			.findElement(By.xpath("//button[contains(text(),'Register')]"))
			.click();

		let registrationSuccess = true;

		// Se verifică dacă înregistrarea a eșuat, cu mesajul de e-mail duplicat
		try {
			await driver.wait(
				until.elementLocated(
					By.xpath("//*[contains(text(),'Acest email este deja folosit!')]")
				),
				3000
			);
			registrationSuccess = false;
		} catch {
			registrationSuccess = true;
		}

		// Dacă înregistrarea a eșuat, se încearcă să se logheze cu aceleași date
		if (!registrationSuccess) {
			await driver.wait(until.elementLocated(By.linkText("Login")), 5000);
			await driver.findElement(By.linkText("Login")).click();

			// Se așteaptă formularul de autentificare
			await driver.wait(until.elementLocated(By.name("email")), 5000);
			await driver.findElement(By.name("email")).sendKeys("test@email.com");
			await driver.wait(until.elementLocated(By.name("password")), 5000);
			await driver.findElement(By.name("password")).sendKeys("password");

			//Se trimite formularul de autentificare
			await driver.wait(
				until.elementLocated(By.xpath("//button[contains(text(),'Login')]")),
				5000
			);
			await driver
				.findElement(By.xpath("//button[contains(text(),'Login')]"))
				.click();
		}

		try {
			// Se așteaptă să apară o alertă. Aceasta apare câteodată și se referă la faptul ca parola nu este suficient de puternică
			await driver.wait(until.alertIsPresent(), 2000);
			// Se focusează alerta și se acceptă
			const alert = await driver.switchTo().alert();
			await alert.accept();
			console.log("Alert accepted!");
		} catch (e) {
			// Dacă alerta nu apare, se continuă
			console.log("No alert present.");
		}

		await driver.wait(until.elementLocated(By.css("img.rounded-full")), 10000);
		// Se verifică dacă bara de navigație funcționează corect
		await driver.findElement(By.css('a[title="Acasă"]')).click();
		await driver.findElement(By.css('a[title="Favorite"]')).click();
		await driver.findElement(By.css('a[title="Coșul meu"]')).click();

		// Se apasă pe butonul de profil
		await driver.findElement(By.css('button[title="Profilul meu"]')).click();

		// Se așteaptă ca meniul să apară
		await driver.wait(
			until.elementLocated(By.linkText("Detalii personale")),
			5000
		);

		// Se apasă pe linkul "Detalii personale"
		await driver.findElement(By.linkText("Detalii personale")).click();

		// Se completează formularul cu detaliile personale
		let saveProfile = true;
		try {
			let nameInput = await driver.findElement(By.name("nume"));
			await nameInput.clear();
			await nameInput.sendKeys("Test User");

			let adressInput = await driver.findElement(By.name("adresa"));
			await adressInput.clear();
			await adressInput.sendKeys("Adresa Test User");

			let phoneInput = await driver.findElement(By.name("telefon"));
			await phoneInput.clear();
			await phoneInput.sendKeys("0712345678");
			await driver
				.findElement(By.xpath("//button[contains(text(),'Salvează profilul')]"))
				.click();
			// Se așteaptă să apară un pop-up cu mesajul "Profilul a fost salvat!"
			await driver.wait(
				until.elementLocated(
					By.xpath("//*[contains(text(),'Profilul a fost salvat!')]")
				),
				10000
			);
			// Se verifică dacă "Test User" apare în profil
			await driver.wait(
				until.elementLocated(By.xpath("//*[contains(text(),'Test User')]")),
				10000
			);
		} catch (error) {
			saveProfile = false;
		}

		// Dacă profilul este deja înregistrat, acesta se editează și se completează formularul de editare.
		if (!saveProfile) {
			await driver
				.findElement(By.xpath("//button[contains(text(),'Editează profilul')]"))
				.click();
			let nameInput = await driver.findElement(By.name("nume"));
			await nameInput.clear();
			await nameInput.sendKeys("Edit Test User");

			let adressInput = await driver.findElement(By.name("adresa"));
			await adressInput.clear();
			await adressInput.sendKeys("Edit Adresa Test User");

			let phoneInput = await driver.findElement(By.name("telefon"));
			await phoneInput.clear();
			await phoneInput.sendKeys("0799999999");
			await driver
				.findElement(By.xpath("//button[contains(text(),'Salvează profilul')]"))
				.click();
			await driver.wait(
				until.elementLocated(
					By.xpath("//*[contains(text(),'Profilul a fost salvat!')]")
				),
				10000
			);
			await driver.wait(
				until.elementLocated(
					By.xpath("//*[contains(text(),'Edit Test User')]")
				),
				10000
			);
		}
		// Se verifică dacă profilul a fost salvat cu succes
		await driver.wait(async () => {
			const modals = await driver.findElements(By.css(".swal2-container"));
			return modals.length === 0;
		}, 10000);
		// Se verifică paginația
		await driver.findElement(By.css('a[title="Acasă"]')).click();
		await driver
			.findElement(By.xpath("//button[contains(text(),'Înainte')]"))
			.click();

		// Se verifică adăugarea unui produs în coșul de cumpărături și în favorite
		await driver.wait(until.elementLocated(By.css(".puzzle-card")), 10000);
		const puzzleCards = await driver.findElements(By.css(".puzzle-card"));

		// Se caută și se selectează cardul cu puzzle-ul numit "Barcelona"
		let barcelonaCard;
		for (const card of puzzleCards) {
			const titleElem = await card.findElement(By.css(".card-title"));
			const titleText = await titleElem.getText();
			if (titleText.trim() === "Barcelona") {
				barcelonaCard = card;
				break;
			}
		}

		// O dată gasit cardul, se caută butoanele de adăugare în coș și favorite și se apasă pe ele
		if (barcelonaCard) {
			// Find the add-to-cart button inside the card
			const buttons = await barcelonaCard.findElements(By.css("button"));
			for (const btn of buttons) {
				const btnHtml = await btn.getAttribute("innerHTML");
				if (btnHtml.includes("Adaugă în coș")) {
					await btn.click();
					break;
				}
			}

			for (const btn of buttons) {
				const btnHtml = await btn.getAttribute("innerHTML");
				if (btnHtml.includes("Adaugă la favorite")) {
					await btn.click();
					break;
				}
			}
		}

		// Se verifică dacă puzzle-ul se afla în coșul de cumpărături
		await driver.findElement(By.css('a[title="Coșul meu"]')).click();
		// Se așteaptă ca produsul să apară în coș
		await driver.wait(until.elementLocated(By.css("li.flex.py-6")), 10000);
		const cartItems = await driver.findElements(By.css("li.flex.py-6"));

		let foundInCart = false;
		for (const item of cartItems) {
			const text = await item.getText();
			if (text.includes("Barcelona")) {
				foundInCart = true;
				break;
			}
		}
		console.log("Barcelona in cart:", foundInCart);

		// Se apasă pe butonul "Sterge" pentru produsul Barcelona din coș
		// Dacă Barcelona este găsit în coș, se caută butonul "Șterge" și se apasă
		if (foundInCart) {
			for (const item of cartItems) {
				const text = await item.getText();
				if (text.includes("Barcelona")) {
					const stergeBtn = await item.findElement(
						By.xpath(".//button[contains(text(),'Șterge')]")
					);
					await stergeBtn.click();
					break;
				}
			}
			// Se așteaptă actualizarea coșului și se verifică dacă este gol
			await driver.sleep(1000);
			const updatedCartItems = await driver.findElements(
				By.css("li.flex.py-6")
			);
			console.log("Cart empty after Sterge:", updatedCartItems.length === 0);
		}

		// Se verifică dacă puzzle-ul a fost adăugat la favorite
		await driver.findElement(By.css('a[title="Favorite"]')).click();
		// Se așteaptă ca produsul să apară în favorite
		await driver.wait(until.elementLocated(By.css("li.flex.py-6")), 10000);
		const favoritesItems = await driver.findElements(By.css("li.flex.py-6"));

		let foundInFavorites = false;
		for (const item of favoritesItems) {
			const text = await item.getText();
			if (text.includes("Barcelona")) {
				foundInFavorites = true;
				break;
			}
		}
		console.log("Barcelona in favorites:", foundInFavorites);

		// Se apasă pe butonul "Sterge" pentru produsul Barcelona din favorite
		// Dacă Barcelona este găsit în favorite, se caută butonul "Șterge" și se apasă
		if (foundInFavorites) {
			for (const item of favoritesItems) {
				const text = await item.getText();
				if (text.includes("Barcelona")) {
					const stergeBtn = await item.findElement(
						By.xpath(".//button[contains(text(),'Șterge')]")
					);
					await stergeBtn.click();
					break;
				}
			}
			// Se așteaptă actualizarea paginii de favorite si se verifică dacă este goală
			await driver.sleep(1000);
			const updatedFavoritesItems = await driver.findElements(
				By.css("li.flex.py-6")
			);
			console.log(
				"Favorites empty after Sterge:",
				updatedFavoritesItems.length === 0
			);
		}

		// Se teastează asistentul AI. Se introduce o întreabare și se așteaptă răspunsul. Se verifică dacă răspunsul este dat într-un timp limitat
		await driver
			.findElement(By.css('button[aria-label="Deschide chat AI"]'))
			.click();
		await driver.wait(
			until.elementLocated(
				By.css('textarea[placeholder="Scrie întrebarea ta pentru AI..."]')
			),
			10000
		);
		await driver
			.findElement(
				By.css('textarea[placeholder="Scrie întrebarea ta pentru AI..."]')
			)
			.sendKeys("Caut un puzzle cu animale");
		await driver
			.findElement(By.xpath("//button[contains(text(),'Întreabă')]"))
			.click();
		await driver.wait(async () => {
			const aiResponseDivs = await driver.findElements(
				By.css(".border.rounded.bg-gray-50")
			);
			for (const div of aiResponseDivs) {
				const text = await div.getText();
				if (text && text.trim().length > 0 && !text.includes("AI scrie...")) {
					await new Promise((resolve) => setTimeout(resolve, 30000));
					return true;
				}
			}
			return false;
		}, 300000);

		// Se așteaptă după răspuns
		const aiResponseDivs = await driver.findElements(
			By.css(".border.rounded.bg-gray-50")
		);
		for (const div of aiResponseDivs) {
			const text = await div.getText();
			if (text && text.trim().length > 0 && !text.includes("AI scrie...")) {
				console.log("Full AI response:", text.trim());
			}
		}

		// Se testează sesiunea de Log out. Se verifică faptul că ruta privată nu este accesibilă
		await driver.findElement(By.css('button[title="Profilul meu"]')).click();
		await driver.wait(
			until.elementLocated(By.xpath("//button[contains(text(),'Log out')]")),
			5000
		);
		await driver
			.findElement(By.xpath("//button[contains(text(),'Log out')]"))
			.click();
		await driver.get("http://localhost:5173/personal-details");
		let loginPrompt2 = await driver.findElement(
			By.css('a[title="Autentificare"]')
		);
		console.log("Logout session test:", !!loginPrompt2);

		// Se accesează o rută care nu există, pentru a verifica gestionarea erorilor
		await driver.get("http://localhost:5173/nonexistent");
		await driver.wait(
			until.elementLocated(By.xpath("//*[contains(text(),'404')]")),
			2000
		);

		// Se verifică performanța, prin măsurarea timpului de încărcare a paginii
		let start = Date.now();
		await driver.get("http://localhost:5173");
		let end = Date.now();
		console.log("Homepage load time:", end - start, "ms");

		// Se verifică validarea formularului de autentificare, folosind un email invalid și o parolă goală
		await driver.findElement(By.css('a[title="Autentificare"]')).click();
		await driver.findElement(By.name("email")).clear();
		await driver.findElement(By.name("email")).sendKeys("invalid");
		await driver.findElement(By.name("password")).clear();
		await driver.findElement(By.name("password")).sendKeys("");
		await driver
			.findElement(By.xpath("//button[contains(text(),'Login')]"))
			.click();
		const emailInput = await driver.findElement(By.name("email"));
		const message = await driver.executeScript(
			"return arguments[0].validationMessage;",
			emailInput
		);
		if (
			message &&
			message.length > 0 &&
			message ===
				"Please include an '@' in the email address. 'invalid' is missing an '@'."
		) {
			console.log("Email validation message test: PASSED");
		} else {
			console.log("Email validation message test: FAILED");
			console.log("Actual message:", message);
		}
		console.log("Email validation message:", message);

		// Se redimensionează fereastra pentru a simula un dispozitiv mobil și se apasă pe linkul "Acasă"
		await driver.manage().window().setRect({ width: 375, height: 667 });
		await driver.findElement(By.css('a[title="Acasă"]')).click();

		console.log("All tests ran!");
	} finally {
		await driver.quit();
	}
})();
