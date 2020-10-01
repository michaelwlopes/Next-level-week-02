import { useState } from 'react';

interface InitialValues {
  subject: string,
  week_day: string,
  time: string,
}

export default function useFilter(initialValues: InitialValues) {
  const [values, setValues] = useState(initialValues);

  function handleInputChange(name: string, value: string) {
    setValues({
      ...values,
      [name]: value,
    });
  }  
  
  return {
    values,
    handleInputChange,
  }
}