import { createContext, ReactNode, useContext, useState } from "react";

interface FormContextProps {
  isLoginForm: boolean;
  isRegisterForm: boolean;
  showLoginForm: () => void;
  showRegisterForm: () => void;
}
const FormContext = createContext<FormContextProps | undefined>(undefined);

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider = ({ children }: FormProviderProps) => {
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true); // Mostrar login por defecto
  const [isRegisterForm, setIsRegisterForm] = useState<boolean>(false);

  const showLoginForm = () => {
    setIsLoginForm(true);
    setIsRegisterForm(false);
  };

  const showRegisterForm = () => {
    setIsLoginForm(false);
    setIsRegisterForm(true);
  };

  return (
    <FormContext.Provider
      value={{ isLoginForm, isRegisterForm, showLoginForm, showRegisterForm }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = (): FormContextProps => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
