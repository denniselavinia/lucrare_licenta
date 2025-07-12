import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
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

	// Local state for profile and edit mode
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

	// Load profile data from DB when available, or set up for creation if not exist
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
			console.log("Refetched profile:", refreshed.data); // Check if data is correct
			alert("Profilul a fost salvat!");
		} catch {
			alert("Eroare la salvarea profilului!");
		}
	};

	// Handle input changes
	const handleChange = (field, value) => {
		setProfile((prev) => ({ ...prev, [field]: value }));
		setIsDirty(true);
	};

	// Handle image upload
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

	// // Save changes to DB (create or update)
	// const handleSave = async () => {
	// 	try {
	// 		if (isProfileNew) {
	// 			await createAProfile(profile).unwrap();
	// 			setIsProfileNew(false);
	// 		} else {
	// 			await updateProfile({ email: profile.email, ...profile }).unwrap();
	// 		}
	// 		setEditMode(false);
	// 		setIsDirty(false);
	// 		await refetch(); // Refetch to get the latest data from DB
	// 		alert("Profilul a fost salvat!");
	// 	} catch {
	// 		alert("Eroare la salvarea profilului!");
	// 	}
	// };

	if (isLoading) return <div>Se prelucrează datele...</div>;

	// If error AND profileData is undefined, allow creation (show empty form)
	if (isError && !profileData) {
		// Do NOT return here, just continue to render the form for new profile
		// Optionally, show a message:
		// <div>Nu există profil. Completează formularul pentru a crea unul nou.</div>
	}

	// If error AND profileData exists, show error
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
					{/* Name */}
					<div className="flex items-center mb-4">
						<label className="w-24 font-semibold">Nume:</label>
						{editMode ? (
							<input
								type="text"
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
					{/* Email */}
					<div className="flex items-center mb-4">
						<label className="w-24 font-semibold">Email:</label>
						<input
							type="email"
							className="border rounded px-2 py-1 flex-1 bg-gray-100"
							value={profile.email}
							disabled
							readOnly
						/>
					</div>
					{/* Address */}
					<div className="flex items-center mb-4">
						<label className="w-24 font-semibold">Adresă:</label>
						{editMode ? (
							<input
								type="text"
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
					{/* Phone */}
					<div className="flex items-center mb-4">
						<label className="w-24 font-semibold">Telefon:</label>
						{editMode ? (
							<input
								type="tel"
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
