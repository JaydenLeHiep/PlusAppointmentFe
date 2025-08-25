import { apiBaseUrl } from '../config/apiConfig';

const calculateMoneyApiUrl = `${apiBaseUrl}/api/calculate-money`;

const handleApiResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  return data;
};

// ==== BUSINESS ====

export const fetchBusinessYearlyEarnings = async (businessId, yearsBack = 5) => {
  const token = localStorage.getItem('token');
  const url = `${calculateMoneyApiUrl}/business/${businessId}/yearly?yearsBack=${yearsBack}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return handleApiResponse(response);
};

export const fetchBusinessMonthlyEarnings = async (businessId, year) => {
  const token = localStorage.getItem('token');
  const url = `${calculateMoneyApiUrl}/business/${businessId}/monthly?year=${year}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return handleApiResponse(response);
};

export const fetchBusinessWeeklyEarnings = async (businessId, year, isoWeek) => {
  const token = localStorage.getItem('token');
  const url = `${calculateMoneyApiUrl}/business/${businessId}/weekly?year=${year}&week=${isoWeek}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return handleApiResponse(response);
};

export const fetchBusinessDailyEarnings = async (businessId, date) => {
  const token = localStorage.getItem('token');
  const url = `${calculateMoneyApiUrl}/business/${businessId}/daily?date=${date}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return handleApiResponse(response);
};

// ==== STAFF ====

export const fetchStaffYearlyEarnings = async (staffId, yearsBack = 5) => {
  const token = localStorage.getItem('token');
  const url = `${calculateMoneyApiUrl}/staff/${staffId}/yearly?yearsBack=${yearsBack}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return handleApiResponse(response);
};

export const fetchStaffMonthlyEarnings = async (staffId, year) => {
  const token = localStorage.getItem('token');
  const url = `${calculateMoneyApiUrl}/staff/${staffId}/monthly?year=${year}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return handleApiResponse(response);
};

export const fetchStaffWeeklyEarnings = async (staffId, year, isoWeek) => {
  const token = localStorage.getItem('token');
  const url = `${calculateMoneyApiUrl}/staff/${staffId}/weekly?year=${year}&week=${isoWeek}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return handleApiResponse(response);
};

export const fetchStaffDailyEarnings = async (staffId, date) => {
  const token = localStorage.getItem('token');
  const url = `${calculateMoneyApiUrl}/staff/${staffId}/daily?date=${date}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return handleApiResponse(response);
};