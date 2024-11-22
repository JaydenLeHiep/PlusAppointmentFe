import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  fetchCustomerId,
  addCustomer,
  deleteCustomer,
  updateCustomer,
  searchCustomersByName,
  fetchCustomersByBusinessId,
  checkCustomerExists,
  addCheckIn,
  fetchCheckInByBusinessId,
  verifyAndUseDiscountCode
} from '../lib/apiClientCustomer';

const CustomersContext = createContext();

export const useCustomersContext = () => useContext(CustomersContext);

export const CustomersProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [checkIns, setCheckIns] = useState([]);
  const [alert, setAlert] = useState({ message: '', severity: '' });

  const fetchCustomersForBusiness = useCallback(async (businessId) => {
    try {
      const response = await fetchCustomersByBusinessId(businessId);
      setCustomers(response?.$values || []);

    } catch (error) {
      console.error('Error fetching customers for business:', error);
      setAlert({ message: 'Failed to fetch customers for business.', severity: 'error' });
    }
  }, []);

  const findCustomerById = useCallback(async (emailOrPhone) => {
    try {
      const customerId = await fetchCustomerId(emailOrPhone);
      return customerId;
    } catch (error) {
      console.error('Error finding customer:', error);
      setAlert({ message: 'Failed to find customer.', severity: 'error' });
      throw error;
    }
  }, []);

  const addNewCustomer = useCallback(async (businessId, customerDetails) => {
    try {
      await addCustomer(businessId, customerDetails);
      setAlert({ message: 'Customer added successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error adding customer:', error);
      setAlert({ message: 'Failed to add customer.', severity: 'error' });
      throw error;
    }
  }, []);

  const updateExistingCustomer = useCallback(async (businessId, customerId, customerDetails) => {
    try {
      await updateCustomer(customerId, customerDetails);
      setAlert({ message: 'Customer updated successfully!', severity: 'success' });
      await fetchCustomersForBusiness(businessId); // Refresh the customer list
    } catch (error) {
      console.error('Error updating customer:', error);
      setAlert({ message: 'Failed to update customer.', severity: 'error' });
      throw error;
    }
  }, [fetchCustomersForBusiness]);

  const deleteExistingCustomer = useCallback(async (businessId, customerId) => {
    try {
      await deleteCustomer(customerId);
      setAlert({ message: 'Customer deleted successfully!', severity: 'success' });
      await fetchCustomersForBusiness(businessId); // Refresh the customer list
    } catch (error) {
      console.error('Error deleting customer:', error);
      setAlert({ message: 'Failed to delete customer.', severity: 'error' });
      throw error;
    }
  }, [fetchCustomersForBusiness]);

  const searchCustomers = useCallback(async (name) => {
    try {
      const results = await searchCustomersByName(name);
      setCustomers(results);
    } catch (error) {
      console.error('Error searching customers:', error);
      setAlert({ message: 'Failed to search customers.', severity: 'error' });
    }
  }, []);

  const checkIfCustomerExists = useCallback(async (emailOrPhone) => {
    try {
      const customerId = await checkCustomerExists(emailOrPhone);
      return customerId;
    } catch (error) {
      console.error('Error checking customer existence:', error);
      throw error;
    }
  }, []);
  // New method for adding a check-in for a customer
  const addCustomerCheckIn = useCallback(async (checkInDetails) => {
    try {
      await addCheckIn(checkInDetails);
      setAlert({ message: 'Check-in added successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error adding check-in:', error);
      setAlert({ message: 'Failed to add check-in.', severity: 'error' });
      throw error;
    }
  }, []);

  const fetchCheckInDetailsForBusiness = useCallback(async (businessId) => {
    try {
      const response = await fetchCheckInByBusinessId(businessId);
      setCheckIns(response);  // Set the fetched check-in details
    } catch (error) {
      console.error('Error fetching check-in details for business:', error);
      setAlert({ message: 'Failed to fetch check-in details for business.', severity: 'error' });
    }
  }, []);

  const applyDiscountCode = useCallback(async (codeDetails) => {
    try {
      const result = await verifyAndUseDiscountCode(codeDetails);
      setAlert({ message: 'Discount code applied successfully!', severity: 'success' });
      return result;
    } catch (error) {
      console.error('Error applying discount code:', error);
      setAlert({ message: 'Failed to apply discount code.', severity: 'error' });
      throw error;
    }
  }, []);

  const contextValue = {
    customers,
    checkIns,
    findCustomerById,
    addNewCustomer,
    updateExistingCustomer,
    deleteExistingCustomer,
    searchCustomers,
    fetchCustomersForBusiness,
    checkIfCustomerExists,
    addCustomerCheckIn,
    fetchCheckInDetailsForBusiness,
    applyDiscountCode,
    alert,
  };

  return (
    <CustomersContext.Provider value={contextValue}>
      {children}
    </CustomersContext.Provider>
  );
};
