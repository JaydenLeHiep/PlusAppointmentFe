import { apiBaseUrl } from '../config/apiConfig';

const shopPicturesApiUrl = `${apiBaseUrl}/api/shoppictures`;

// API client function for fetching shop pictures by business ID
export const fetchPictureBusiness = async (businessId) => {
  const response = await fetch(`${shopPicturesApiUrl}/business/business_id=${businessId}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch pictures: ${response.status}`);
  }

  const data = await response.json();
  
  if (Array.isArray(data)) {
    return data;
  } else if (data.$values) {
    return data.$values;
  } else {
    console.error('Unexpected data format:', data);
    throw new Error('Unexpected data format');
  }
};
