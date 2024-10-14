// src/components/Table2.jsx
import React from 'react';

const Table2 = ({ data }) => {
    const columnas = ['Casa', 'Correo_electronico', 'Documento', 'Motivo', 'Fecha', 'Hora'];

    return (
        <div className="overflow-x-auto w-full max-w-4xl">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr className="bg-amarillo-principal">
                        {columnas.map((columna) => (
                            <th key={columna} className="px-4 py-2 text-left text-xs font-roboto_mono font-medium text-gray-900 uppercase tracking-wider">
                                {columna}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((dato, index) => (
                        <tr key={index}>
                            <td className="px-4 py-2 whitespace-nowrap text-sm font-roboto_mono">{dato.Casa}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm font-roboto_mono">{dato.Correo_electronico}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm font-roboto_mono">{dato.Documento}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm font-roboto_mono">{dato.Motivo}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm font-roboto_mono">{dato.Fecha}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm font-roboto_mono">{dato.Hora}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table2;
