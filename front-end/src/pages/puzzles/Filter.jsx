import React, { useState } from 'react';

const Filter = ({ puzzles }) => {
  // Get unique values for filters
  const categories = [...new Set(puzzles.map(p => p.category).filter(Boolean))];
  const manufacturers = [...new Set(puzzles.map(p => p.manufacturer).filter(Boolean))];
  const categoryImages = [...new Set(puzzles.map(p => p.categoryImage).filter(Boolean))];

  // State for selected filters
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [selectedCategoryImages, setSelectedCategoryImages] = useState([]);

  // Handlers for checkboxes
  const handleCheckbox = (value, selected, setSelected) => {
    setSelected(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  // Filter puzzles
  const filtered = puzzles.filter(p =>
    (selectedCategories.length === 0 || selectedCategories.includes(p.category)) &&
    (selectedManufacturers.length === 0 || selectedManufacturers.includes(p.manufacturer)) &&
    (selectedCategoryImages.length === 0 || selectedCategoryImages.includes(p.categoryImage))
  );

  return (
    <div className="flex justify-center items-start min-h-[70vh] w-full">
      <div className="">
        {/* Category checkboxes */}
        {/* <div>
          <div className="font-semibold mb-1">Categorie</div>
          {categories.map(cat => (
            <label key={cat || idx} className="block">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCheckbox(cat, selectedCategories, setSelectedCategories)}
                className="mr-1"
              />
              {cat}
            </label>
          ))}
        </div> */}
        {/* Manufacturer checkboxes */}
        {/* <div>
          <div className="font-semibold mb-1">Producător</div>
          {manufacturers.map(man => (
            <label key={man || idx} className="block">
              <input
                type="checkbox"
                checked={selectedManufacturers.includes(man)}
                onChange={() => handleCheckbox(man, selectedManufacturers, setSelectedManufacturers)}
                className="mr-1"
              />
              {man}
            </label>
          ))}
        </div> */}
        {/* CategoryImage checkboxes */}
        <div>
          <div className="font-semibold mb-1">Category Image</div>
          {categoryImages.map(img => (
            <label key={img || idx} className="block">
              <input
                type="checkbox"
                checked={selectedCategoryImages.includes(img)}
                onChange={() => handleCheckbox(img, selectedCategoryImages, setSelectedCategoryImages)}
                className="mr-1"
              />
              {img}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;