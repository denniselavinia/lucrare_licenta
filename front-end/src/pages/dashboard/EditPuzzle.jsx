import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useFetchPuzzleByIdQuery, useUpdatePuzzleMutation } from '../../redux/features/puzzles/puzzlesAPI';
import Loading from '../../components/Loading';
import getBaseUrl from '../../utils/baseURL';
import InputField from './addPuzzle/InputField';
import SelectField from './addPuzzle/SelectField';

const EditPuzzle = () => {
  const { id } = useParams();
  const { data: puzzleData, isLoading, isError, refetch } = useFetchPuzzleByIdQuery(id);
  const [updatePuzzle] = useUpdatePuzzleMutation();
  const { register, handleSubmit, setValue, reset } = useForm();
  useEffect(() => {
    if (puzzleData) {
        setValue('title', puzzleData.title);
        setValue('description', puzzleData?.description);
        setValue('noPieces', puzzleData.noPieces);
        setValue('categoryImage', puzzleData?.categoryImage);
        setValue('categoryManufacturer', puzzleData?.categoryManufacturer);
        setValue('price', puzzleData.price);
        setValue('coverImage', puzzleData.coverImage)
    }
  }, [puzzleData, setValue])

  const onSubmit = async (data) => {
    const updatePuzzleData = {
        title: data.title,
        description: data.description,
        noPieces: data.noPieces,
        categoryImage: data.categoryImage,
        categoryManufacturer: data.categoryManufacturer,
        price: Number(data.price),
        coverImage: data.coverImage || puzzleData.coverImage,
    };
    try {
      await axios.put(`${getBaseUrl()}/api/puzzles/edit/${id}`, updatePuzzleData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      Swal.fire({
            title: "Puzzle actualizat",
            text: "Puzzle-ul a fost actualizat cu succes!",
            icon: "success",
            timer: 1500,
      });
      await refetch()
    } catch (error) {
        console.log("Actualizarea puzzle-ului a eșuat!");
        Swal.fire({
          title: "Eroare",
          text: "Eroare la actualizarea puzzle-ului!",
          icon: "error",
          timer: 1500,
    });
    }
  }
  if (isLoading) return <Loading />
  if (isError) return <div>Eroare la încarcarea datelor despre puzzle</div>
  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Actualizează puzzle</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
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

        <InputField
          label="Imagine"
          name="coverImage"
          type="text"
          placeholder="URL-ul imaginii"
          register={register}
        />

        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">
          Actualizează puzzle
        </button>
      </form>
    </div>
  )
}

export default EditPuzzle