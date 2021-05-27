import { createContext } from 'react';

const DrawerContext = createContext();

function DrawerProvider({children, type}) {

    return (
        <DrawerContext.Provider value={{ type }}>
            {children}
        </DrawerContext.Provider>
    );
}

export { DrawerContext, DrawerProvider };