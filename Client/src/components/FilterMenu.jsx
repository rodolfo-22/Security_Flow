// src/components/FilterMenu.jsx
import React, { useState } from 'react';

const FilterMenu = ({ filterResults }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleFilterClick = (filterType) => {
        filterResults(filterType, selectedDate);
        setMenuOpen(false);  // Cierra el menú después de seleccionar una opción
    };

    const filterOptions = [
        { id: 'all', label: 'Mostrar todas las entradas' },
        { id: 'casa', label: 'Filtrar por casa' },
        { id: 'motivo', label: 'Filtrar por motivo' },
        { id: 'fecha', label: 'Filtrar por fecha' },
    ];

    return (
        <div className="relative">
            <button
                type="button"
                className="bg-amarillo-principal text-black py-1 px-4 rounded-md text-sm font-roboto_mono"
                onClick={toggleMenu}
            >
                Filtrar resultados
            </button>
            {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg">
                    <div className="py-1">
                        {filterOptions.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleFilterClick(option.id)}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                                {option.label}
                            </button>
                        ))}
                        <div className="block px-4 py-2 text-sm text-gray-700">
                            <label htmlFor="filter-date" className="block text-sm font-medium text-gray-700">Selecciona fecha:</label>
                            <input
                                type="date"
                                id="filter-date"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterMenu;
