import React, { createContext, useState, useEffect } from "react";
import { backend } from '../constants';

export const DeviceContext = createContext();

const DeviceContextProvider = (props) => {
    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem('user');
        return storedToken ? JSON.parse(storedToken) : null;
    });

    const [devices, setDevices] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const updateDevices = async () => {
        try {
            setIsPending(true);

            const response = await fetch(backend + '/api/devices', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${ token }`,
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();

            setDevices(data);

            setIsPending(false);
        } catch (error) {
            setError(error);
            setIsPending(false);
        }
    }

    useEffect(() => {
        updateDevices();
    }, []);

    return (
        <DeviceContext.Provider value={ { devices, updateDevices, isPending, error } }>
            { props.children }
        </DeviceContext.Provider>
    );
}

export default DeviceContextProvider;