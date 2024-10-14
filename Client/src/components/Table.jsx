import React from 'react';

const Table = ({ columnas, datos }) => {
  return (
    <div className='w-full h-full mt-6 mr-6 ml-auto pl-5 pr-5'>
      <div className='m-6 flex justify-center'>
        <h1 className='font-bold text-2xl font-roboto_mono'>Tabla de Residentes</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y border-separate border-spacing-0.5 border border-gray-500">
          <thead>
            <tr className='bg-[#F8BD0D] bg-opacity-70 font-semibold font-roboto_mono'>
              {columnas.map(columna => (
                <th key={columna.accessor || columna.Header} className="px-4 py-2 text-center border border-gray-500">
                  {columna.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='text-center bg-gray-100 border-stone-500 font-roboto_mono'>
            {datos.map((dato, index) => (
              <tr key={index} className="hover:bg-gray-100 border-black">
                {columnas.map(columna => (
                  <td key={columna.accessor || columna.Header} className="border px-4 py-2 border-gray-500">
                    {columna.accessor ? (dato[columna.accessor] || 'N/A') : columna.Cell({ row: { original: dato } })}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
