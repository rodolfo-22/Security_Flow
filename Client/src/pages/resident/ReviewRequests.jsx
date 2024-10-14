import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import RequestCard from '../../components/RequestsCard';

const ReviewRequests = () => {
    const [requests, setRequests] = useState([
        { id: 1, name: 'Amigo 1', status: 'pending' },
        { id: 2, name: 'Amigo 2', status: 'pending' },
        { id: 3, name: 'Amigo 3', status: 'pending' },
        { id: 4, name: 'Amigo 4', status: 'pending' },
    ]);

    const handleApprove = (id) => {
        setRequests(requests.map(request => 
            request.id === id ? { ...request, status: 'approved' } : request
        ));
    };

    const handleReject = (id) => {
        setRequests(requests.map(request => 
            request.id === id ? { ...request, status: 'rejected' } : request
        ));
    };
    return (
        <div className="flex flex-col items-center font-roboto_mono">
            <h1 className="text-2xl text-[#6185A9] text-center pt-6 pb-2">Solicitudes de Visita</h1>
            <div className='overflow-y-auto h-96 mb-8 '>
                {requests.map(request => (
                    <RequestCard 
                        key={request.id} 
                        request={request} 
                        onApprove={() => handleApprove(request.id)} 
                        onReject={() => handleReject(request.id)} 
                    />
                ))}
            </div>
        </div>
    )
}

export default ReviewRequests
