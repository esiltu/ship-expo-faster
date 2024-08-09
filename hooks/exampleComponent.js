import React from 'react';
import { View, Text } from 'react-native';
import useDeviceOrientation from './useDeviceOrientation';
import useInterval from './useInterval';
import useAsync from './useAsync';
import usePrevious from './usePrevious';
import useNetworkStatus from './useNetworkStatus';

const MyComponent = () => {
    const orientation = useDeviceOrientation();
    const networkStatus = useNetworkStatus();
    const { data, loading, error } = useAsync(async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        return response.json();
    }, []);

    const prevNetworkStatus = usePrevious(networkStatus);

    useInterval(() => {
        console.log('This will run every second');
    }, 1000);

    return (
        <View>
            <Text>Orientation: {orientation}</Text>
            <Text>Network Status: {networkStatus ? 'Online' : 'Offline'}</Text>
            <Text>Previous Network Status: {prevNetworkStatus ? 'Online' : 'Offline'}</Text>
            {loading && <Text>Loading...</Text>}
            {error && <Text>Error: {error.message}</Text>}
            {data && <Text>Data: {JSON.stringify(data)}</Text>}
        </View>
    );
};

export default MyComponent;
