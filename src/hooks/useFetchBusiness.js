// src/hooks/useFetchBusinesses.js

import { useState, useEffect } from 'react';
import { fetchBusinesses } from '../lib/OwnerDashboardApiClient';

const useFetchBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBusinesses();
        setBusinesses(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { businesses, loading, error };
};

export default useFetchBusinesses;
