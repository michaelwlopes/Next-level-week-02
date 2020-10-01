import { useState, FormEvent } from 'react';

interface InitialValues {
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  subject: string;
  cost: string;

}

export default function useForm(initialValues: InitialValues) {
  const [values, setValues] = useState(initialValues);

  function handleInputChange(inputInfos: FormEvent<HTMLInputElement>) {
    const { value } = inputInfos.currentTarget;
    const name = inputInfos.currentTarget.getAttribute('id') as string;
    setValues({
      ...values,
      [name]: value,
    });
  }

  function handleTextareaChange(textareInfos: FormEvent<HTMLTextAreaElement>) {
    const { value } = textareInfos.currentTarget;
    const name = textareInfos.currentTarget.getAttribute('id') as string;
    setValues({
      ...values,
      [name]: value,
    });
  }
  
  function handleSelectChange(textareInfos: FormEvent<HTMLSelectElement>) {
    const { value } = textareInfos.currentTarget;
    const name = textareInfos.currentTarget.getAttribute('id') as string;
    setValues({
      ...values,
      [name]: value,
    });
  }

  function clearForm() {
    setValues(initialValues);
  }
  
  return {
    values,
    handleInputChange,
    handleTextareaChange,
    handleSelectChange,
    clearForm
  }
}