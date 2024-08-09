import React, { createContext, useState, useContext } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        notificationsEnabled: true,
        darkMode: false,
    });

    const updateSettings = (newSettings) => {
        setSettings(prevSettings => ({ ...prevSettings, ...newSettings }));
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);
