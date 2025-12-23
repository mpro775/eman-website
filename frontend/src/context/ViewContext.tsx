import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface ViewContextType {
    isAboutView: boolean;
    setIsAboutView: (value: boolean) => void;
    toggleView: () => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAboutView, setIsAboutView] = useState(false);

    const toggleView = () => {
        setIsAboutView((prev) => !prev);
    };

    return (
        <ViewContext.Provider value={{ isAboutView, setIsAboutView, toggleView }}>
            {children}
        </ViewContext.Provider>
    );
};

export const useView = (): ViewContextType => {
    const context = useContext(ViewContext);
    if (!context) {
        throw new Error('useView must be used within a ViewProvider');
    }
    return context;
};

export default ViewContext;
