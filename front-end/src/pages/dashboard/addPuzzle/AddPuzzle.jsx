import React, { useState } from 'react'
import InputField from './InputField'
import SelectField from './SelectField'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useAddPuzzleMutation } from '../../../redux/features/puzzles/puzzlesAPI';

const AddPuzzle = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageFile, setimageFile] = useState(null);
    const [addPuzzle, {isLoading, isError}] = useAddPuzzleMutation()
    const [imageFileName, setimageFileName] = useState('')
    const onSubmit = async (data) => {
 
        const newPuzzleData = {
            ...data,
            coverImage: imageFileName
        }
        try {
            await addPuzzle(newPuzzleData).unwrap();
            Swal.fire({
                title: "Puzzle adăugat",
                text: "Puzzle-ul a fost adăugat cu succes!",
                icon: "success",
              showCancelButton: false,
                timer: 1500,
              });
              reset();
              setimageFileName('')
              setimageFile(null);
        } catch (error) {
            console.error(error);
            Swal.fire({
              title: "Eroare",
              text: "Eroarea la adăugarea puzzle-ului. Încearcă din nou!",
              icon: "error",
            showCancelButton: false,
              timer: 1500,
            });
        }
      
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setimageFile(file);
            setimageFileName(file.name);
        }
    }
  return (
    <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Adaugă puzzle nou</h2>

      <form onSubmit={handleSubmit(onSubmit)} className=''>
      <InputField
          label="Titlu"
          name="title"
          placeholder="Introdu titlul puzzle-ului"
          register={register}
        />

        <InputField
          label="Descriere"
          name="description"
          placeholder="Introdu descrierea puzzle-ului"
          type="textarea"
          register={register}
        />
        
        <InputField
          label="Număr de piese"
          name="noPieces"
          placeholder="Introdu numărul de piese"
          type="textarea"
          register={register}
        />

        <SelectField
          label="Categorie"
          name="categoryImage"
          options={[
            { value: '', label: 'Alege o categorie' },
            { value: 'Clădiri', label: 'Clădiri' },
            { value: 'Natură', label: 'Natură' },
            { value: 'Orașe', label: 'Orașe' },
            { value: 'Oameni', label: 'Oameni' },
            { value: 'Peisaje', label: 'Peisaje' },
            { value: 'Animale', label: 'Animale' },
            { value: 'Istorie', label: 'Istorie' },
            { value: 'Natură și animale', label: 'Natură și animale' },
            { value: 'Abstract', label: 'Abstract' },
            { value: 'Forme', label: 'Forme' },
          ]}
          register={register}
              />

        <SelectField
          label="Brand"
          name="categoryManufacturer"
          options={[
            { value: '', label: 'Alege un brand pentru puzzle' },
            { value: 'Trefl', label: 'Trefl' },
            { value: 'Clementoni', label: 'Clementoni' },
            { value: 'Ravensburger', label: 'Ravensburger' },
            { value: 'Schmidt', label: 'Schmidt' },
            { value: 'Castorland', label: 'Castorland' },
          ]}
          register={register}
              />

        <InputField
          label="Preț"
          name="price"
          type="number"
          placeholder="Preț"
          register={register}
        />

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Imagine</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
          {imageFileName && <p className="text-sm text-gray-500">Selecție: {imageFileName}</p>}
        </div>

        <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
         {
            isLoading ? <span className="">Se adaugă.. </span> : <span>Adăugare puzzle</span>
          }
        </button>
      </form>
    </div>
  )
}

export default AddPuzzle