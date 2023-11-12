import React, { createContext, useState, useEffect } from "react";
import { backend } from '../constants';
import 'react-toastify/dist/ReactToastify.css';

export const EmailContext = createContext();

const EmailContextProvider = (props) => {
    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem('user');
        return storedToken ? JSON.parse(storedToken) : null;
    });

    const [emailList, setEmailList] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const updateEmail = async () => {
        try {
            // Set isPending to true before making the request
            setIsPending(true);

            // Make the request
            const response = await fetch(backend + '/api/recipients', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${ token }`,
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();

            // Update the state with the new data
            setEmailList(data);

            // Set isPending to false after the request is complete
            setIsPending(false);
        } catch (error) {
            // Handle errors and set the error state
            console.error('Error updating email:', error);
            setError(error);
            setIsPending(false);
        }
    }

    useEffect(() => {
        // Call the updateEmail function when the component mounts
        updateEmail();
    }, []); // Empty dependency array means it runs once when the component mounts

    return (
        <EmailContext.Provider value={ { emailList, updateEmail, isPending, error } }>
            { props.children }
        </EmailContext.Provider>
    );
}

export default EmailContextProvider;
