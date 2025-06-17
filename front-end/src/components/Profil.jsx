
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
const defaultProfileImage = 'https://ui-avatars.com/api/?name=User&background=random';

const Profil = () => {
  const { currentUser } = useAuth();

  // Initial state (replace with data from backend if available)
  const [profile, setProfile] = useState({
    image: defaultProfileImage,
    name: '',
    email: currentUser?.email || '',
    address: '',
    phone: '',
  });

  const [editMode, setEditMode] = useState({
    image: false,
    name: false,
    email: false,
    address: false,
    phone: false,
  });

  // Handle input changes
  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Toggle edit mode for a field
  const toggleEdit = (field) => {
    setEditMode(prev => ({ ...prev, [field]: !prev[field] }));
  };

  // Save changes (implement backend update here)
  const handleSave = () => {
    // TODO: Send profile to backend
    setEditMode({ image: false, name: false, email: false, address: false, phone: false });
    alert('Profilul a fost salvat!');
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8 mt-10">
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={profile.image}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-200"
          />
          <button
            className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600"
            onClick={() => toggleEdit('image')}
            title="Schimbă imaginea"
          >
            ✏️
          </button>
          {editMode.image && (
            <input
              type="file"
              accept="image/*"
              className="mt-2"
              onChange={handleImageChange}
            />
          )}
        </div>
        <div className="mt-6 w-full">
          {/* Name */}
          <div className="flex items-center mb-4">
            <label className="w-24 font-semibold">Nume:</label>
            {editMode.name ? (
              <input
                type="text"
                className="border rounded px-2 py-1 flex-1"
                value={profile.name}
                onChange={e => handleChange('name', e.target.value)}
                placeholder="Completează numele"
              />
            ) : (
              <span className="flex-1">{profile.name || <span className="text-gray-400">Nume necompletat</span>}</span>
            )}
            <button
              className="ml-2 text-blue-500 hover:underline"
              onClick={() => toggleEdit('name')}
            >
              {editMode.name ? 'Salvează' : 'Editează'}
            </button>
          </div>
          {/* Email */}
          <div className="flex items-center mb-4">
            <label className="w-24 font-semibold">Email:</label>
            {editMode.email ? (
              <input
                type="email"
                className="border rounded px-2 py-1 flex-1"
                value={profile.email}
                onChange={e => handleChange('email', e.target.value)}
                placeholder="Completează emailul"
              />
            ) : (
              <span className="flex-1">{profile.email || <span className="text-gray-400">Email necompletat</span>}</span>
            )}
            <button
              className="ml-2 text-blue-500 hover:underline"
              onClick={() => toggleEdit('email')}
            >
              {editMode.email ? 'Salvează' : 'Editează'}
            </button>
          </div>
          {/* Address */}
          <div className="flex items-center mb-4">
            <label className="w-24 font-semibold">Adresă:</label>
            {editMode.address ? (
              <input
                type="text"
                className="border rounded px-2 py-1 flex-1"
                value={profile.address}
                onChange={e => handleChange('address', e.target.value)}
                placeholder="Completează adresa"
              />
            ) : (
              <span className="flex-1">{profile.address || <span className="text-gray-400">Adresă necompletată</span>}</span>
            )}
            <button
              className="ml-2 text-blue-500 hover:underline"
              onClick={() => toggleEdit('address')}
            >
              {editMode.address ? 'Salvează' : 'Editează'}
            </button>
          </div>
          {/* Phone */}
          <div className="flex items-center mb-4">
            <label className="w-24 font-semibold">Telefon:</label>
            {editMode.phone ? (
              <input
                type="tel"
                className="border rounded px-2 py-1 flex-1"
                value={profile.phone}
                onChange={e => handleChange('phone', e.target.value)}
                placeholder="Completează telefonul"
              />
            ) : (
              <span className="flex-1">{profile.phone || <span className="text-gray-400">Telefon necompletat</span>}</span>
            )}
            <button
              className="ml-2 text-blue-500 hover:underline"
              onClick={() => toggleEdit('phone')}
            >
              {editMode.phone ? 'Salvează' : 'Editează'}
            </button>
          </div>
        </div>
        <button
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 font-bold"
          onClick={handleSave}
        >
          Salvează profilul
        </button>
      </div>
    </div>
  );
};

export default Profil