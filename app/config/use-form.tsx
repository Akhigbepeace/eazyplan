import { SyntheticEvent, useState } from "react";

type Submit = () => void;

export function useForm<T>(defaultValue: T, onSubmit?: Submit) {
  const [formValues, setFormValues] = useState<any>(defaultValue);

  const handleOnChange = (e: SyntheticEvent) => {
    const { name, value } = e.currentTarget as HTMLInputElement;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (onSubmit) onSubmit();
  };

  return {
    handleOnChange,
    handleSubmit,
    formValues,
    setFormValues,
  };
}
