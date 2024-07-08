import { apiBaseUrl } from '../config/apiConfig';
const appointmentApiUrl = `${apiBaseUrl}/api/appointments`;

//Api appointments

export const fetchAppointments = async (businessId) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('User not authenticated');
    }
    const appointmentBusinessApiUrl = `${appointmentApiUrl}/business/business_id=${businessId}`;
    const response = await fetch(appointmentBusinessApiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    
    if (Array.isArray(data)) {
        return data;
    } else if (data.$values) {
        return data.$values;
    } else {
        throw new Error('Unexpected data format');
    }
};


// for add Appointment
export const addAppointment = async (appointmentDetails) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('User not authenticated');
    }

    const response = await fetch(`${appointmentApiUrl}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentDetails),
    });

    const data = await response.json();
    console.log(data)
    if (!response.ok) {
        throw new Error(data.message);
    }
    return data;
};


// change the status of an appointment 

export const changeStatusAppointments = async (appointmentId, status) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('User not authenticated');
    }
    const appointmentBusinessApiUrl = `${appointmentApiUrl}/appointment_id=${appointmentId}/status`;
    const response = await fetch(appointmentBusinessApiUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(status),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    // const data = await response.json();
    // if (Array.isArray(data)) {
    //     return data;
    // } else if (data.$values) {
    //     return data.$values;
    // } else {
    //     throw new Error('Unexpected data format');
    // }
};

// delete the appointment
export const deleteAppointment = async (appointmentId) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('User not authenticated');
    }
    const appointmentBusinessApiUrl = `${appointmentApiUrl}/appointment_id=${appointmentId}/`;
    const response = await fetch(appointmentBusinessApiUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    // const data = await response.json();
    // if (Array.isArray(data)) {
    //     return data;
    // } else if (data.$values) {
    //     return data.$values;
    // } else {
    //     throw new Error('Unexpected data format');
    // }
};