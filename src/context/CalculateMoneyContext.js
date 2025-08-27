import React, { createContext, useContext, useState, useCallback } from 'react';
import {
    fetchBusinessYearlyEarnings,
    fetchBusinessMonthlyEarnings,
    fetchBusinessWeeklyEarnings,
    fetchBusinessDailyEarnings,
    fetchBusinessTodaySummary,
    fetchStaffYearlyEarnings,
    fetchStaffMonthlyEarnings,
    fetchStaffWeeklyEarnings,
    fetchStaffDailyEarnings,
    fetchStaffTodaySummary
} from '../lib/apiClientCalculateMoney';

const CalculateMoneyContext = createContext();

export const useCalculateMoneyContext = () => useContext(CalculateMoneyContext);

export const CalculateMoneyProvider = ({ children }) => {
    const [businessEarnings, setBusinessEarnings] = useState([]);
    const [staffEarnings, setStaffEarnings] = useState([]);
    const [businessTodaySummary, setBusinessTodaySummary] = useState(null);
    const [staffTodaySummary, setStaffTodaySummary] = useState(null);
    const [businessDailyEarnings, setBusinessDailyEarnings] = useState(null);

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
            const earningsArray = data?.$values || data || [];
            setBusinessEarnings(earningsArray);
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
            setBusinessDailyEarnings(data);
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

    const getBusinessTodaySummary = useCallback(async (businessId) => {
        try {
            const data = await fetchBusinessTodaySummary(businessId);
            setBusinessTodaySummary(data);
        } catch (error) {
            console.error('Error fetching business today summary:', error);
        }
    }, []);

    const getStaffTodaySummary = useCallback(async (businessId, staffId) => {
        try {
            const data = await fetchStaffTodaySummary(businessId, staffId);
            setStaffTodaySummary(data);
        } catch (error) {
            console.error('Error fetching staff today summary:', error);
        }
    }, []);

    const contextValue = {
        businessEarnings,
        staffEarnings,
        businessTodaySummary,
        staffTodaySummary,
        businessDailyEarnings,
        getBusinessYearlyEarnings,
        getBusinessMonthlyEarnings,
        getBusinessWeeklyEarnings,
        getBusinessDailyEarnings,
        getBusinessTodaySummary,
        getStaffYearlyEarnings,
        getStaffMonthlyEarnings,
        getStaffWeeklyEarnings,
        getStaffDailyEarnings,
        getStaffTodaySummary,
    };

    return (
        <CalculateMoneyContext.Provider value={contextValue}>
            {children}
        </CalculateMoneyContext.Provider>
    );
};