import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from 'react-router-dom';
import { backend } from '../constants';

export const DeviceContext = createContext();

const DeviceContextProvider = (props) => {
    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem('user');
        return storedToken ? JSON.parse(storedToken) : null;
    });

    const [devices, setDevices] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { toggleLogin, isLoggedin, toggleLogout } = useContext(AuthContext);

    const updateDevices = () => {
        console.log("--------------------------------------update devices has been called with isloggiedin: ", isLoggedin);
        setToken(JSON.parse(localStorage.getItem('user')));
        if (isLoggedin && token) {
            setIsPending(true);
            fetch(backend + '/api/devices', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${ token }`,
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                if (res.status === 401) {
                    console.log("----------------------toggleLogout() called by DeviceContext LINE 29");
                    toggleLogout();
                    setIsPending(false);
                } else if (!res.ok) {
                    console.log('status: ')
                    console.log(res.status);
                    setIsPending(false);
                    throw Error('Could not fetch the data for that resource');
                }
                return res.json();
            }).then((data) => {
                console.log('data from use Fetch: ', data);
                setDevices(data);
                setIsPending(false);
                setError(null);
            }).catch((err) => {
                console.log('inside error: ', err)
                setIsPending(false);
                setError(err.message);
            });
        } else {
            // console.log("-------------navigate to / called by devicecontext line 53");
            // console.log('isLoggedin: ', isLoggedin);
            // navigate("/");
            return;
        }
    }

    useEffect(() => {
        updateDevices();
    }, [isLoggedin]);

    return (
        <DeviceContext.Provider value={ { devices, updateDevices, isPending, error } }>
            { props.children }
        </DeviceContext.Provider>
    );
}

export default DeviceContextProvider;