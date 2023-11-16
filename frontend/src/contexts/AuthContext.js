import React, { createContext, useState, useEffect } from "react";
import { backend } from '../constants';
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem('user');
        return storedToken ? JSON.parse(storedToken) : null;
    });
    const [isLoggedin, setIsLoggedin] = useState(() => {
        return token ? true : false;
    });

    const toggleLogin = () => {

        try {
            console.log('toggleLogin');
            const userToken = JSON.parse(localStorage.getItem('user'));
            setToken(prevToken => userToken);
            console.log("local storage token: ");
            console.log(JSON.parse(localStorage.getItem('user')));
            console.log('token variable: ');
            console.log(userToken);

            setIsLoggedin(prevIsLoggedin => true);
            // if (userToken) {
            //     console.log('if token');
            //     try {
            //         const response = await fetch(backend + '/api/users/current', {
            //             method: 'GET',
            //             headers: {
            //                 Authorization: `Bearer ${ userToken }`,
            //                 'Content-Type': 'application/json',
            //             }
            //         });

            //         console.log("before checking response: ", response);

            //         if (response.ok) {
            //             setIsLoggedin(true);
            //             console.log('response good');
            //             console.log('isLoggedin: ', isLoggedin);
            //         } else {
            //             console.log('response bad');
            //             setIsLoggedin(false);
            //         }
            //     } catch (error) {
            //         console.error(error);
            //         setIsLoggedin(false);
            //     }
            // } else {
            //     console.log('else token');
            //     setIsLoggedin(false);
            // }
        } catch (err) {
            console.log("err from authcontext---------------------------------------", err);
            setIsLoggedin(false);
            localStorage.removeItem('user');
        }
    }

    const toggleLogout = () => {
        setIsLoggedin(false);
        setToken(null);
        localStorage.removeItem('user');
    }

    // useEffect(() => {
    //     console.log('use effect isLoggedin: ', isLoggedin);
    //     if (token) {
    //         localStorage.setItem('user', JSON.stringify(token));
    //     } else {
    //         localStorage.removeItem('user');
    //     }
    // }, [token]);

    return (
        <AuthContext.Provider value={ { toggleLogin: toggleLogin, isLoggedin: isLoggedin, toggleLogout: toggleLogout } }>
            { props.children }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
