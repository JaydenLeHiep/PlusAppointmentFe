import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  fetchAllWorkSessions,
  fetchWorkSessionsByBusiness,
  fetchWorkSessionById,
  createWorkSession,
  updateWorkSession,
  deleteWorkSession
} from '../lib/apiClientWorkSession';

const WorkSessionsContext = createContext();

export const useWorkSessionsContext = () => useContext(WorkSessionsContext);

export const WorkSessionsProvider = ({ children }) => {
  const [workSessions, setWorkSessions] = useState([]);

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
    workSessions,
    fetchAllWorkSessionsData,
    fetchWorkSessionsByBusinessData,
    getWorkSessionById,
    createWorkSessionAndUpdateList,
    updateWorkSessionAndRefresh,
    deleteWorkSessionAndRefresh
  };

  return (
    <WorkSessionsContext.Provider value={contextValue}>
      {children}
    </WorkSessionsContext.Provider>
  );
};
