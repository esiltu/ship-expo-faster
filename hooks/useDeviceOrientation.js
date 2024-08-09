import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

const useDeviceOrientation = () => {
    const [orientation, setOrientation] = useState(
        Dimensions.get('window').width > Dimensions.get('window').height ? 'landscape' : 'portrait'
    );

    useEffect(() => {
        const handleChange = ({ window }) => {
            setOrientation(window.width > window.height ? 'landscape' : 'portrait');
        };

        Dimensions.addEventListener('change', handleChange);

        return () => {
            Dimensions.removeEventListener('change', handleChange);
        };
    }, []);

    return orientation;
};

export default useDeviceOrientation;
