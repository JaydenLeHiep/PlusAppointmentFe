
import { useState, useEffect } from 'react';
import { fetchAppointments } from '../lib/apiClient';


const useFetchAppointments = (businessId) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    useEffect(() =>{
        const fetchData = async () => {
            try{
                const data = await fetchAppointments(businessId);
                setAppointments(data);
            }catch(error){
                setError(error.message);
            } finally{
                setLoading(false);
            }
        }
        fetchData();
    }, [businessId])

    return {appointments, loading, error}
};

export default useFetchAppointments;