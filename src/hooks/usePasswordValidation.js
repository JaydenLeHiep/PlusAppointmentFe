import { useState, useEffect } from 'react';

const usePasswordValidation = (password) => {
  const [passwordValid, setPasswordValid] = useState(false);

  useEffect(() => {
    const strongPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
    setPasswordValid(strongPassword.test(password));
  }, [password]);

  return passwordValid;
};

export default usePasswordValidation;
