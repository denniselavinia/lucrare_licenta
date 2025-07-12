import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCreateOrderMutation } from "../../redux/features/orders/ordersAPI";
import { clearCart } from "../../redux/features/cart/cartSlice";

const Checkout = () => {
	const cartItems = useSelector((state) => state.cart.cartItems);

	const totalPrice = cartItems
		.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0)
		.toFixed(2);

	const { currentUser } = useAuth();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
	} = useForm({ mode: "onChange" });

	const [createOrder, { isLoading, error }] = useCreateOrderMutation();

	const navigate = useNavigate();
	const [isChecked, setIsChecked] = useState(false);

	const dispatch = useDispatch();

	const onSubmit = async (data) => {
		const newOrder = {
			name: data.name,
			email: currentUser?.email,
			address: {
				city: data.city,
				country: data.country,
				zipcode: data.zipcode,
			},
			phone: data.phone,
			productIds: cartItems.map((item) => item?._id),
			totalPrice: totalPrice,
		};

		try {
			await createOrder(newOrder).unwrap();
			dispatch(clearCart());
			Swal.fire({
				title: "Comandă plasată!",
				text: "Comanda a fost plasată cu succes!",
				icon: "success",
				timer: 1500,
				showConfirmButton: false,
			});
			navigate("/comenzi");
		} catch (error) {
			console.error("Eroare la plasarea comenzii", error);
			Swal.fire({
				title: "Comandă eșuată!",
				text: "A fost intâmpinată o eroare la plasarea comenzii. Vă rugăm să reîncercați!",
				icon: "error",
				showConfirmButton: true,
			});
		}
	};
	if (isLoading) {
		return <div className="text-center">Se procesează comanda...</div>;
	}

	return (
		<section>
			<div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
				<div className="container max-w-screen-lg mx-auto">
					<div>
						<div>
							<h2 className="font-semibold text-xl text-gray-600 mb-2">
								Plată cash la livrare
							</h2>
							<p className="text-gray-500 mb-2">Preț total: {totalPrice} RON</p>
							<p className="text-gray-500 mb-6">
								Număr produse : {cartItems.length}
							</p>
						</div>

						<div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
							<form
								onSubmit={handleSubmit(onSubmit)}
								className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
							>
								<div className="text-gray-600">
									<p className="font-medium text-lg">
										Date de facturare și livrare
									</p>
								</div>

								<div className="lg:col-span-2">
									<div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
										<div className="md:col-span-5">
											<label htmlFor="full_name">Nume</label>
											<input
												type="text"
												name="name"
												id="name"
												className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
												{...register("name", {
													required: "Numele este obligatoriu",
												})}
											/>
										</div>

										<div className="md:col-span-5">
											<label htmlFor="email">E-mail</label>
											<input
												type="email"
												name="email"
												id="email"
												defaultValue={currentUser?.email}
												className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
												placeholder="email@domain.com"
												{...register("email", {
													required: "E-mailul este obligatoriu",
													pattern: {
														value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
														message: "Introduceți un e-mail valid",
													},
												})}
											/>
											{errors.email && (
												<span className="text-red-500 text-xs">
													{errors.email.message}
												</span>
											)}
										</div>

										<div className="md:col-span-5">
											<label htmlFor="phone">Număr telefon</label>
											<input
												type="tel"
												name="phone"
												id="phone"
												className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
												placeholder="07xxxxxxxx"
												{...register("phone", {
													required: "Numărul de telefon este obligatoriu",
													pattern: {
														value: /^0\d{9}$/,
														message:
															"Introduceți un număr valid (ex: 07xxxxxxxx)",
													},
												})}
											/>
											{errors.phone && (
												<span className="text-red-500 text-xs">
													{errors.phone.message}
												</span>
											)}
										</div>

										<div className="md:col-span-5">
											<label htmlFor="address">Adresă</label>
											<input
												type="text"
												name="address"
												id="address"
												className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
												placeholder=""
												{...register("address", {
													required: "Adresa este obligatorie",
												})}
											/>
											{errors.address && (
												<span className="text-red-500 text-xs">
													{errors.address.message}
												</span>
											)}
										</div>

										<div className="md:col-span-5 flex flex-col md:flex-row gap-4">
											<div className="flex-1">
												<label htmlFor="country">Județ</label>
												<input
													list="judete"
													name="country"
													id="country"
													placeholder="Alege județul"
													className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
													autoComplete="off"
													{...register("country", {
														required: "Județul este obligatoriu",
													})}
												/>
												<datalist id="judete">
													<option value="Alba" />
													<option value="Arad" />
													<option value="Argeș" />
													<option value="Bacău" />
													<option value="Bihor" />
													<option value="Bistrița-Năsăud" />
													<option value="Botoșani" />
													<option value="Brașov" />
													<option value="Brăila" />
													<option value="București" />
													<option value="Buzău" />
													<option value="Caraș-Severin" />
													<option value="Călărași" />
													<option value="Cluj" />
													<option value="Constanța" />
													<option value="Covasna" />
													<option value="Dâmbovița" />
													<option value="Dolj" />
													<option value="Galați" />
													<option value="Giurgiu" />
													<option value="Gorj" />
													<option value="Harghita" />
													<option value="Hunedoara" />
													<option value="Ialomița" />
													<option value="Iași" />
													<option value="Ilfov" />
													<option value="Maramureș" />
													<option value="Mehedinți" />
													<option value="Mureș" />
													<option value="Neamț" />
													<option value="Olt" />
													<option value="Prahova" />
													<option value="Satu Mare" />
													<option value="Sălaj" />
													<option value="Sibiu" />
													<option value="Suceava" />
													<option value="Teleorman" />
													<option value="Timiș" />
													<option value="Tulcea" />
													<option value="Vaslui" />
													<option value="Vâlcea" />
													<option value="Vrancea" />
												</datalist>
												{errors.country && (
													<span className="text-red-500 text-xs">
														{errors.country.message}
													</span>
												)}
											</div>
											<div className="flex-1">
												<label htmlFor="city">Oraș</label>
												<input
													type="text"
													name="city"
													id="city"
													className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
													placeholder=""
													{...register("city", {
														required: "Orașul este obligatoriu",
													})}
												/>
												{errors.city && (
													<span className="text-red-500 text-xs">
														{errors.city.message}
													</span>
												)}
											</div>
											<div className="flex-1">
												<label htmlFor="zipcode">Cod poștal</label>
												<input
													type="text"
													name="zipcode"
													id="zipcode"
													className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
													placeholder=""
													{...register("zipcode", {
														required: "Codul poștal este obligatoriu",
													})}
												/>
												{errors.zipcode && (
													<span className="text-red-500 text-xs">
														{errors.zipcode.message}
													</span>
												)}
											</div>
										</div>

										<div className="md:col-span-5 mt-3">
											<div className="inline-flex items-center">
												<input
													type="checkbox"
													name="billing_same"
													id="billing_same"
													className="form-checkbox"
													checked={isChecked}
													onChange={(e) => setIsChecked(e.target.checked)}
												/>
												<label htmlFor="billing_same" className="ml-2 ">
													Am citit si sunt de acord cu{" "}
													<Link className="underline underline-offset-2 text-blue-600">
														Temenii și condițiile The new Life of Puzzle
													</Link>{" "}
												</label>
											</div>
										</div>

										<div className="md:col-span-5 text-right">
											<div className="inline-flex items-end">
												<button
													type="submit"
													disabled={!isChecked || !isValid}
													className={`font-bold py-2 px-4 rounded $
                ${
									!isChecked || !isValid
										? "bg-blue-300 text-white opacity-50 cursor-not-allowed"
										: "bg-blue-500 text-white hover:bg-blue-700 cursor-pointer"
								}
            `}
												>
													Plasează comanda
												</button>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Checkout;
