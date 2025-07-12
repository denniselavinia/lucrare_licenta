import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import {
	useGetProfileByEmailQuery,
	useUpdateProfileMutation,
	useCreateProfileMutation,
} from "../redux/features/profiles/profileAPI";

const defaultProfileImage =
	"https://ui-avatars.com/api/?name=User&background=random";

const Profile = () => {
	const { currentUser } = useAuth();
	const {
		data: profileData,
		isLoading,
		isError,
		refetch,
	} = useGetProfileByEmailQuery(currentUser.email);

	const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
	const [createAProfile, { isLoading: isCreating }] =
		useCreateProfileMutation();

	const [profile, setProfile] = useState({
		image: defaultProfileImage,
		name: "",
		email: currentUser?.email || "",
		address: "",
		phone: "",
	});
	const [editMode, setEditMode] = useState(false);
	const [isDirty, setIsDirty] = useState(false);
	const [isProfileNew, setIsProfileNew] = useState(false);

	useEffect(() => {
		if (profileData && Object.keys(profileData).length > 0) {
			setProfile({
				image: profileData.image || defaultProfileImage,
				name: profileData.name || "",
				email: profileData.email || currentUser?.email || "",
				address: profileData.address || "",
				phone: profileData.phone || "",
			});
			setEditMode(false);
			setIsDirty(false);
			setIsProfileNew(false);
		} else if (currentUser?.email) {
			setProfile({
				image: defaultProfileImage,
				name: "",
				email: currentUser.email,
				address: "",
				phone: "",
			});
			setEditMode(true);
			setIsDirty(true);
			setIsProfileNew(true);
		}
	}, [profileData, currentUser]);

	const handleSave = async () => {
		try {
			if (isProfileNew) {
				await createAProfile(profile).unwrap();
			} else {
				await updateProfile({ email: profile.email, ...profile }).unwrap();
			}
			const refreshed = await refetch();
			console.log("Refetched profile:", refreshed.data);
			Swal.fire({
				title: "Profilul a fost salvat!",
				icon: "info",
				showConfirmButton: false,
				timer: 2000,
			});
		} catch {
			Swal.fire({
				title: "Eroare la salvarea profilului!",
				icon: "error",
				showConfirmButton: false,
				timer: 2000,
			});
		}
	};

	const handleChange = (field, value) => {
		setProfile((prev) => ({ ...prev, [field]: value }));
		setIsDirty(true);
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setProfile((prev) => ({ ...prev, image: reader.result }));
				setIsDirty(true);
			};
			reader.readAsDataURL(file);
		}
	};

	if (isLoading) return <div>Se prelucrează datele...</div>;

	if (isError && !profileData) {
	}

	if (isError && profileData) {
		return <div>Eroare la obținerea datelor despre profil</div>;
	}
	return (
		<div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8 mt-10">
			<div className="flex flex-col items-center">
				<div className="relative">
					<img
						src={profile.image}
						alt="Profile"
						className="w-32 h-32 rounded-full object-cover border-4 border-blue-200"
					/>
					{editMode && (
						<input
							type="file"
							accept="image/*"
							className="absolute bottom-0 right-0 mt-2"
							onChange={handleImageChange}
							style={{ width: "120px" }}
						/>
					)}
				</div>
				<div className="mt-6 w-full">
					<div className="flex items-center mb-4">
						<label className="w-24 font-semibold">Nume:</label>
						{editMode ? (
							<input
								type="text"
								name="nume"
								className="border rounded px-2 py-1 flex-1"
								value={profile.name}
								onChange={(e) => handleChange("name", e.target.value)}
								placeholder="Completează numele"
							/>
						) : (
							<span className="flex-1">
								{profile.name || (
									<span className="text-gray-400">Nume necompletat</span>
								)}
							</span>
						)}
					</div>
					<div className="flex items-center mb-4">
						<label className="w-24 font-semibold">Email:</label>
						<input
							type="email"
							name="email"
							className="border rounded px-2 py-1 flex-1 bg-gray-100"
							value={profile.email}
							disabled
							readOnly
						/>
					</div>
					<div className="flex items-center mb-4">
						<label className="w-24 font-semibold">Adresă:</label>
						{editMode ? (
							<input
								type="text"
								name="adresa"
								className="border rounded px-2 py-1 flex-1"
								value={profile.address}
								onChange={(e) => handleChange("address", e.target.value)}
								placeholder="Completează adresa"
							/>
						) : (
							<span className="flex-1">
								{profile.address || (
									<span className="text-gray-400">Adresă necompletată</span>
								)}
							</span>
						)}
					</div>
					<div className="flex items-center mb-4">
						<label className="w-24 font-semibold">Telefon:</label>
						{editMode ? (
							<input
								type="tel"
								name="telefon"
								className="border rounded px-2 py-1 flex-1"
								value={profile.phone}
								onChange={(e) => handleChange("phone", e.target.value)}
								placeholder="Completează telefonul"
							/>
						) : (
							<span className="flex-1">
								{profile.phone || (
									<span className="text-gray-400">Telefon necompletat</span>
								)}
							</span>
						)}
					</div>
				</div>
				{!editMode ? (
					<button
						className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 font-bold"
						onClick={() => setEditMode(true)}
					>
						Editează profilul
					</button>
				) : (
					<button
						className={`mt-6 px-6 py-2 rounded font-bold text-white ${
							isDirty
								? "bg-blue-500 hover:bg-blue-600"
								: "bg-gray-400 cursor-not-allowed"
						}`}
						onClick={handleSave}
						disabled={!isDirty || isSaving || isCreating}
					>
						{isSaving || isCreating ? "Se salvează..." : "Salvează profilul"}
					</button>
				)}
			</div>
		</div>
	);
};

export default Profile;
