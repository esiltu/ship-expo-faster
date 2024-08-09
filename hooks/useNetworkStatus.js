import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

const useNetworkStatus = () => {
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

    return isConnected;
};

export default useNetworkStatus;
