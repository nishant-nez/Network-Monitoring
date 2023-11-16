import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { backend } from "../constants";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const { toggleLogout } = useContext(AuthContext);
    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem('user');
        return storedToken ? JSON.parse(storedToken) : null;
    });

    useEffect(() => {
        fetch(backend + url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${ token }`,
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (res.status === 401) {
                console.log("----------------------toggleLogout() called by useFetch LINE 25");
                toggleLogout();
                console.log('toggle logout called by USEFETCH')
            } else if (!res.ok) {
                console.log('status: ')
                console.log(res.status);
                console.log('res: ')
                console.log(res)
                throw Error('Could not fetch the data for that resource. Response: ', res);
            }
            return res.json();
        }).then((data) => {
            // console.log('data from use Fetch: ', data);
            setData(data);
            setIsPending(false);
            setError(null);
        }).catch(err => {
            setIsPending(false);
            setError(err.message);
        });
    }, [url, token, toggleLogout]);

    return { data, isPending, error };
};


export default useFetch;