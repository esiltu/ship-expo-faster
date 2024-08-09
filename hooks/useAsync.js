import { useState, useEffect } from 'react';

const useAsync = (asyncFunction, dependencies = []) => {
    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect(() => {
        let isMounted = true;

        asyncFunction()
            .then(data => {
                if (isMounted) {
                    setState({ data, loading: false, error: null });
                }
            })
            .catch(error => {
                if (isMounted) {
                    setState({ data: null, loading: false, error });
                }
            });

        return () => {
            isMounted = false;
        };
    }, dependencies);

    return state;
};

export default useAsync;
