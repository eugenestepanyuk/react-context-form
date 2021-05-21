import { createContext, useState } from 'react';

const DrawerContext = createContext();

function DrawerProvider(props) {
    const [content, setContent] = useState(null);
    const сhangeContent = (value) => {
        setContent(value)
    };

    return (
        <DrawerContext.Provider value={{ content, сhangeContent }}>
            {props.children}
        </DrawerContext.Provider>
    );
}

export { DrawerContext, DrawerProvider };