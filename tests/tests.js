const { Builder, By, Key, until } = require("selenium-webdriver");

(async function runTests() {
	let driver = await new Builder().forBrowser("chrome").build();

	try {
		// Start with a clean session
		await driver.get("http://localhost:5173");
		await driver.manage().deleteAllCookies();
		await driver.get("http://localhost:5173");

		let title = await driver.getTitle();
		console.log("Homepage title:", title);

		// Wait for Navbar
		await driver.wait(until.elementLocated(By.css("nav")), 3000);

		// Try different selectors for login link
		let loginLink;
		try {
			loginLink = await driver.findElement(By.css('a[title="Autentificare"]'));
		} catch {
			loginLink = await driver.findElement(By.css('a[href="/login"]'));
		}
		await loginLink.click();

		// Click the "Register" link or button
		await driver.wait(until.elementLocated(By.linkText("Register")), 5000);
		await driver.findElement(By.linkText("Register")).click();

		// Wait for registration form
		await driver.wait(until.elementLocated(By.name("email")), 5000);
		await driver.findElement(By.name("email")).sendKeys("test@email.com");
		await driver.wait(until.elementLocated(By.name("password")), 5000);
		await driver.findElement(By.name("password")).sendKeys("password");
		// Submit registration form
		await driver.wait(
			until.elementLocated(By.xpath("//button[contains(text(),'Register')]")),
			5000
		);
		await driver
			.findElement(By.xpath("//button[contains(text(),'Register')]"))
			.click();

		let registrationSuccess = true;

		// Check if registration failed due to duplicate email
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

		// After registration fails
		if (!registrationSuccess) {
			await driver.wait(until.elementLocated(By.linkText("Login")), 5000);
			await driver.findElement(By.linkText("Login")).click();

			// Wait for registration form
			await driver.wait(until.elementLocated(By.name("email")), 5000);
			await driver.findElement(By.name("email")).sendKeys("test@email.com");
			await driver.wait(until.elementLocated(By.name("password")), 5000);
			await driver.findElement(By.name("password")).sendKeys("password");
			// Submit registration form
			await driver.wait(
				until.elementLocated(By.xpath("//button[contains(text(),'Login')]")),
				5000
			);
			await driver
				.findElement(By.xpath("//button[contains(text(),'Login')]"))
				.click();
		}

		try {
			// Wait for alert to be present (timeout 2 seconds)
			await driver.wait(until.alertIsPresent(), 2000);
			// Switch to alert and accept it
			const alert = await driver.switchTo().alert();
			// Accept the alert (equivalent to pressing OK)
			await alert.accept();
			console.log("Alert accepted!");
		} catch (e) {
			// No alert appeared, continue as normal
			console.log("No alert present.");
		}

		await driver.wait(until.elementLocated(By.css("img.rounded-full")), 10000);
		// Navigation works
		await driver.findElement(By.css('a[title="Acasă"]')).click();
		await driver.findElement(By.css('a[title="Favorite"]')).click();
		await driver.findElement(By.css('a[title="Coșul meu"]')).click();

		// Profile create/edit
		await driver.findElement(By.css('button[title="Profilul meu"]')).click();

		// Wait for the dropdown to appear
		await driver.wait(
			until.elementLocated(By.linkText("Detalii personale")),
			5000
		);

		// Click the Detalii personale link
		await driver.findElement(By.linkText("Detalii personale")).click();

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
			// Wait for success swal message "Profilul a fost salvat!"
			await driver.wait(
				until.elementLocated(
					By.xpath("//*[contains(text(),'Profilul a fost salvat!')]")
				),
				10000
			);
			// Optionally, also check if "Test User" appears
			await driver.wait(
				until.elementLocated(By.xpath("//*[contains(text(),'Test User')]")),
				10000
			);
		} catch (error) {
			saveProfile = false;
		}
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
		await driver.wait(
			async () => {
				const modals = await driver.findElements(By.css(".swal2-container"));
				return modals.length === 0;
			},
			10000 // up to 10 seconds
		);
		// Pagination
		await driver.findElement(By.css('a[title="Acasă"]')).click();
		await driver
			.findElement(By.xpath("//button[contains(text(),'Înainte')]"))
			.click();

		// Add to cart/favorites
		// Select the first puzzle card before adding to cart/favorites
		// Find all puzzle cards
		await driver.wait(until.elementLocated(By.css(".puzzle-card")), 10000);
		const puzzleCards = await driver.findElements(By.css(".puzzle-card"));

		let barcelonaCard;
		for (const card of puzzleCards) {
			const titleElem = await card.findElement(By.css(".card-title"));
			const titleText = await titleElem.getText();
			if (titleText.trim() === "Barcelona") {
				barcelonaCard = card;
				break;
			}
		}

		// Do NOT click barcelonaCard itself (it may trigger navigation or re-render)
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

		// Check if Barcelona is in cart
		await driver.findElement(By.css('a[title="Coșul meu"]')).click();
		// Wait for cart items to appear (li.flex.py-6)
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

		// Click on "Sterge" button for Barcelona item in cart
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
			// Wait for cart to update
			await driver.sleep(1000);
			const updatedCartItems = await driver.findElements(
				By.css("li.flex.py-6")
			);
			console.log("Cart empty after Sterge:", updatedCartItems.length === 0);
		}

		// Check if Barcelona is in favorites
		await driver.findElement(By.css('a[title="Favorite"]')).click();
		// Wait for cart items to appear (li.flex.py-6)
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

		// Click on "Sterge" button for Barcelona item in favorites
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
			// Wait for favorites to update
			await driver.sleep(1000);
			const updatedFavoritesItems = await driver.findElements(
				By.css("li.flex.py-6")
			);
			console.log(
				"Favorites empty after Sterge:",
				updatedFavoritesItems.length === 0
			);
		}

		// AI search
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
		// Wait until at least one response element has non-empty text
		await driver.wait(async () => {
			const aiResponseDivs = await driver.findElements(
				By.css(".border.rounded.bg-gray-50")
			);
			for (const div of aiResponseDivs) {
				const text = await div.getText();
				if (text && text.trim().length > 0 && !text.includes("AI scrie...")) {
					// Wait 30 seconds before printing and returning the message
					await new Promise((resolve) => setTimeout(resolve, 30000));
					return true;
				}
			}
			return false;
		}, 300000);

		// After waiting for AI response
		const aiResponseDivs = await driver.findElements(
			By.css(".border.rounded.bg-gray-50")
		);
		for (const div of aiResponseDivs) {
			const text = await div.getText();
			if (text && text.trim().length > 0 && !text.includes("AI scrie...")) {
				console.log("Full AI response:", text.trim());
			}
		}

		// Logout session: ensure protected route is not accessible
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

		// Error handling: simulate backend error (requires backend manipulation or mock)
		// For demonstration, try to access a non-existent route
		await driver.get("http://localhost:5173/nonexistent");
		await driver.wait(
			until.elementLocated(By.xpath("//*[contains(text(),'404')]")),
			2000
		);

		// Performance: measure page load time
		let start = Date.now();
		await driver.get("http://localhost:5173");
		let end = Date.now();
		console.log("Homepage load time:", end - start, "ms");

		// Form validation (invalid login)
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

		// Mobile/responsive: resize window
		await driver.manage().window().setRect({ width: 375, height: 667 });
		await driver.findElement(By.css('a[title="Acasă"]')).click();

		console.log("All tests ran!");
	} finally {
		await driver.quit();
	}
})();
