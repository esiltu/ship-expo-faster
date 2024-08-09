import React, { createContext, useState, useEffect, useContext } from 'react';
import NetInfo from '@react-native-community/netinfo';

const ConnectivityContext = createContext();

export const ConnectivityProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(null);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        NetInfo.fetch().then(state => {
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <ConnectivityContext.Provider value={{ isConnected }}>
            {children}
        </ConnectivityContext.Provider>
    );
};

export const useConnectivity = () => useContext(ConnectivityContext);
