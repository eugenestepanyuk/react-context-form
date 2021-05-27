import { createContext, useState } from "react";

const FormContext = createContext();

function FormProvider(props) {
  const [content, setContent] = useState({});
  const сhangeContent = (key, value) => {
    setContent((state) => ({ ...state, [key]: value }));
  };

  return (
    <FormContext.Provider value={{ content, сhangeContent }}>
      {props.children}
    </FormContext.Provider>
  );
}

export { FormContext, FormProvider };
