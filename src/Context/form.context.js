import { createContext, useState } from 'react';

const FormContext = createContext();

function FormProvider(props) {
    const [content, setContent] = useState(null);
    const сhangeContent = (value) => {
        setContent(value)
    };

    return (
        <FormContext.Provider value={{ content, сhangeContent }}>
            {props.children}
        </FormContext.Provider>
    );
}

export { FormContext, FormProvider };