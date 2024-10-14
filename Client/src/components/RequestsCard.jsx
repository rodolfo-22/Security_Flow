import React from 'react';

const RequestCard = ({ request, onApprove, onReject }) => {
    return (
        <div className="bg-[#D9D9D9] bg-opacity-52 shadow-md rounded-lg p-4 m-2 flex flex-row justify-between items-center">
            <div>
                <p className="text-lg p-1">{request.name}</p>
                <p className={`text-sm ${request.status === 'approved' ? 'text-green-500' : request.status === 'rejected' ? 'text-red-500' : 'text-yellow-500'}`}>
                    {request.status === 'approved' ? 'Aprobado' : request.status === 'rejected' ? 'Rechazado' : 'Pendiente'}
                </p>
            </div>
            {request.status === 'pending' && (
                <div className="flex flex-row">
                    <button onClick={onApprove} className="bg-[#F5CB50] text-black rounded-lg p-2 mx-1">Aprobar</button>
                    <button onClick={onReject} className="bg-red-300 text-black rounded-lg p-2 mx-1">Rechazar</button>
                </div>
            )}
        </div>
    );
}

export default RequestCard;
