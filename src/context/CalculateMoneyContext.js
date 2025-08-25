import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  fetchBusinessYearlyEarnings,
  fetchBusinessMonthlyEarnings,
  fetchBusinessWeeklyEarnings,
  fetchBusinessDailyEarnings,
  fetchStaffYearlyEarnings,
  fetchStaffMonthlyEarnings,
  fetchStaffWeeklyEarnings,
  fetchStaffDailyEarnings,
} from '../lib/apiClientCalculateMoney';

import {
  fetchAllWorkSessions,
  fetchWorkSessionsByBusiness,
  fetchWorkSessionById,
  createWorkSession,
  updateWorkSession,
  deleteWorkSession
} from '../lib/apiClientWorkSession';

const CalculateMoneyContext = createContext();

export const useCalculateMoneyContext = () => useContext(CalculateMoneyContext);

export const CalculateMoneyProvider = ({ children }) => {
  const [businessEarnings, setBusinessEarnings] = useState([]);
  const [staffEarnings, setStaffEarnings] = useState([]);
  const [workSessions, setWorkSessions] = useState([]);

  // === BUSINESS ===
  const getBusinessYearlyEarnings = useCallback(async (businessId, yearsBack = 5) => {
    try {
      const data = await fetchBusinessYearlyEarnings(businessId, yearsBack);
      setBusinessEarnings(data);
    } catch (error) {
      console.error('Error fetching business yearly earnings:', error);
    }
  }, []);

  const getBusinessMonthlyEarnings = useCallback(async (businessId, year) => {
    try {
      const data = await fetchBusinessMonthlyEarnings(businessId, year);
      setBusinessEarnings(data);
    } catch (error) {
      console.error('Error fetching business monthly earnings:', error);
    }
  }, []);

  const getBusinessWeeklyEarnings = useCallback(async (businessId, year, week) => {
    try {
      const data = await fetchBusinessWeeklyEarnings(businessId, year, week);
      setBusinessEarnings(data);
    } catch (error) {
      console.error('Error fetching business weekly earnings:', error);
    }
  }, []);

  const getBusinessDailyEarnings = useCallback(async (businessId, date) => {
    try {
      const data = await fetchBusinessDailyEarnings(businessId, date);
      setBusinessEarnings(data);
    } catch (error) {
      console.error('Error fetching business daily earnings:', error);
    }
  }, []);

  // === STAFF ===
  const getStaffYearlyEarnings = useCallback(async (staffId, yearsBack = 5) => {
    try {
      const data = await fetchStaffYearlyEarnings(staffId, yearsBack);
      setStaffEarnings(data);
    } catch (error) {
      console.error('Error fetching staff yearly earnings:', error);
    }
  }, []);

  const getStaffMonthlyEarnings = useCallback(async (staffId, year) => {
    try {
      const data = await fetchStaffMonthlyEarnings(staffId, year);
      setStaffEarnings(data);
    } catch (error) {
      console.error('Error fetching staff monthly earnings:', error);
    }
  }, []);

  const getStaffWeeklyEarnings = useCallback(async (staffId, year, week) => {
    try {
      const data = await fetchStaffWeeklyEarnings(staffId, year, week);
      setStaffEarnings(data);
    } catch (error) {
      console.error('Error fetching staff weekly earnings:', error);
    }
  }, []);

  const getStaffDailyEarnings = useCallback(async (staffId, date) => {
    try {
      const data = await fetchStaffDailyEarnings(staffId, date);
      setStaffEarnings(data);
    } catch (error) {
      console.error('Error fetching staff daily earnings:', error);
    }
  }, []);

  // === WorkSessions ===
  const fetchAllWorkSessionsData = useCallback(async () => {
    try {
      const data = await fetchAllWorkSessions();
      setWorkSessions(data);
    } catch (error) {
      console.error('Error fetching all work sessions:', error);
    }
  }, []);

  const fetchWorkSessionsByBusinessData = useCallback(async (businessId) => {
    try {
      const data = await fetchWorkSessionsByBusiness(businessId);
      setWorkSessions(data);
    } catch (error) {
      console.error('Error fetching work sessions by business:', error);
    }
  }, []);

  const getWorkSessionById = useCallback(async (id) => {
    try {
      return await fetchWorkSessionById(id);
    } catch (error) {
      console.error('Error fetching work session by ID:', error);
      throw error;
    }
  }, []);

  const createWorkSessionAndUpdateList = useCallback(async (sessionData) => {
    try {
      await createWorkSession(sessionData);
      // optionally refresh list after creation
    } catch (error) {
      console.error('Error creating work session:', error);
      throw error;
    }
  }, []);

  const updateWorkSessionAndRefresh = useCallback(async (id, sessionData, businessId = null) => {
    try {
      await updateWorkSession(id, sessionData);
      if (businessId) {
        await fetchWorkSessionsByBusinessData(businessId);
      }
    } catch (error) {
      console.error('Error updating work session:', error);
      throw error;
    }
  }, [fetchWorkSessionsByBusinessData]);

  const deleteWorkSessionAndRefresh = useCallback(async (id, businessId = null) => {
    try {
      await deleteWorkSession(id);
      if (businessId) {
        await fetchWorkSessionsByBusinessData(businessId);
      }
    } catch (error) {
      console.error('Error deleting work session:', error);
      throw error;
    }
  }, [fetchWorkSessionsByBusinessData]);

  const contextValue = {
    businessEarnings,
    staffEarnings,
    workSessions,
    getBusinessYearlyEarnings,
    getBusinessMonthlyEarnings,
    getBusinessWeeklyEarnings,
    getBusinessDailyEarnings,
    getStaffYearlyEarnings,
    getStaffMonthlyEarnings,
    getStaffWeeklyEarnings,
    getStaffDailyEarnings,
    fetchAllWorkSessionsData,
    fetchWorkSessionsByBusinessData,
    getWorkSessionById,
    createWorkSessionAndUpdateList,
    updateWorkSessionAndRefresh,
    deleteWorkSessionAndRefresh,
  };

  return (
    <CalculateMoneyContext.Provider value={contextValue}>
      {children}
    </CalculateMoneyContext.Provider>
  );
};