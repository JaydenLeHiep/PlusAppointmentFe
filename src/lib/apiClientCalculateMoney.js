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

export const fetchBusinessTodaySummary = async (businessId) => {
  const token = localStorage.getItem('token');
  const url = `${calculateMoneyApiUrl}/business/${businessId}/today-summary`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return handleApiResponse(response);
};

// ==== STAFF ====

export const fetchStaffYearlyEarnings = async (businessId, staffId, yearsBack = 5) => {
  const token = localStorage.getItem('token');
  const url = `${calculateMoneyApiUrl}/business/${businessId}/staff/${staffId}/yearly?yearsBack=${yearsBack}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return handleApiResponse(response);
};

export const fetchStaffMonthlyEarnings = async (businessId, staffId, year) => {
  const token = localStorage.getItem('token');
  const url = `${calculateMoneyApiUrl}/business/${businessId}/staff/${staffId}/monthly?year=${year}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return handleApiResponse(response);
};

export const fetchStaffWeeklyEarnings = async (businessId, staffId, year, isoWeek) => {
  const token = localStorage.getItem('token');
  const url = `${calculateMoneyApiUrl}/business/${businessId}/staff/${staffId}/weekly?year=${year}&week=${isoWeek}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return handleApiResponse(response);
};

export const fetchStaffDailyEarnings = async (businessId, staffId, date) => {
  const token = localStorage.getItem('token');
  const url = `${calculateMoneyApiUrl}/business/${businessId}/staff/${staffId}/daily?date=${date}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return handleApiResponse(response);
};

export const fetchStaffTodaySummary = async (businessId, staffId) => {
  const token = localStorage.getItem('token');
  const url = `${calculateMoneyApiUrl}/business/${businessId}/staff/${staffId}/today-summary`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return handleApiResponse(response);
};