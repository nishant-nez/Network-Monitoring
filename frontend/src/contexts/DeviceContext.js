import React, { createContext, useState } from "react";
import useFetch from "../hooks/useFetch";

export const DeviceContext = createContext();

const DeviceContextProvider = (props) => {
    const [devices, setDevices] = useState(null);

    // const { data } = useFetch('/api/devices');
    // setDevices(data);

    const updateDevices = (data) => {
        setDevices(data);
        // console.log('updateDevices: ', data);
    };

    return (
        <DeviceContext.Provider value={ { devices: devices, updateDevices: updateDevices } }>
            { props.children }
        </DeviceContext.Provider>
    );
}

export default DeviceContextProvider;