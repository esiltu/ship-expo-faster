import React from 'react';
import { ThemeProvider } from './ThemeContext';
import { SettingsProvider } from './SettingsContext';
import { NotificationProvider } from './NotificationContext';
import { ConnectivityProvider } from './ConnectivityContext';
import MyComponent from './MyComponent'; // Adjust the path as per your file structure

const App = () => {
    return (
        <ThemeProvider>
            <SettingsProvider>
                <NotificationProvider>
                    <ConnectivityProvider>
                        <MyComponent />
                    </ConnectivityProvider>
                </NotificationProvider>
            </SettingsProvider>
        </ThemeProvider>
    );
};

export default App;
