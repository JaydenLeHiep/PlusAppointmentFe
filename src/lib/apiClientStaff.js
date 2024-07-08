import { apiBaseUrl } from '../config/apiConfig';
const staffApiUrl = `${apiBaseUrl}/api/staff`;

// API client function for fetching staff
export const fetchStaff = async (businessId) => {
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   throw new Error('User not authenticated');
    // }
    const staffApiUrl_1 = `${apiBaseUrl}/api/staff/business_id=${businessId}`;
    const response = await fetch(staffApiUrl_1, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`,
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

// API client function for adding a new staff member
export const addStaff = async (businessId, staffDetails) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('User not authenticated');
    }
    const response = await fetch(`${staffApiUrl}/business_id=${businessId}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(staffDetails),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }
    return data;
};

// API client function for deleting a staff member
export const deleteStaff = async (businessId, staffId) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('User not authenticated');
    }

    const response = await fetch(`${staffApiUrl}/business_id=${businessId}/staff_id=${staffId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
    }

    return response.json();
};