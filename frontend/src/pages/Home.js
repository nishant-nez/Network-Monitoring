import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext";
import { DeviceContext } from '../contexts/DeviceContext';
import { Spinner } from '@material-tailwind/react';
import ComplexNavbar from '../components/ComplexNavbar';
import SortableTable from '../components/SortableTable';
import useFetch from '../hooks/useFetch';
import { backend } from '../constants';
import {
    Typography, Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { PencilIcon, UserPlusIcon, PlusIcon, UserIcon } from "@heroicons/react/24/solid";
// import AddDeviceForm from "../components/AddDeviceForm";
import Overview from '../components/Overview';
import { Toast, ToastBox } from "../components/Toast";



const Home = () => {
    document.title = "Home | Network Monitoring";
    const navigate = useNavigate();
    const { isLoggedin, toggleLogin, toggleLogout } = useContext(AuthContext);
    const { devices, updateDevices, isPending, error } = useContext(DeviceContext);
    // const [data, setData] = useState(null);
    // const { data, isPending, error } = useFetch('/api/devices');
    const [open, setOpen] = React.useState(false);

    const [isClicked, setIsClicked] = useState(false);

    const handleOpen = () => setOpen(!open);

    // const fetchData = () => {
    //     fetch('/api/devices') // You can use the appropriate URL here
    //         .then((res) => {
    //             if (res.status === 401) {
    //                 // handleOpen();
    //                 toggleLogout();
    //                 console.log('toggle logout called by HOME ko FETCHDATA')
    //             } else if (!res.ok) {
    //                 // handleOpen();
    //                 throw Error('Could not fetch the data for that resource');
    //             }
    //             return res.json();
    //         })
    //         .then((newData) => {
    //             updateDevices(newData);
    //             setIsClicked(!isClicked);
    //         })
    //         .catch((err) => {
    //             // handleOpen();
    //             console.error(`Error: ${ err }`);
    //             // Handle error
    //         });
    // };

    // Use setInterval to periodically fetch data
    // useEffect(() => {
    //     const intervalId = setInterval(fetchData, 180000); // Fetch data every 5 minutes (300,000 ms)

    //     // Clean up the interval on unmount
    //     return () => clearInterval(intervalId);
    // }, []);

    useEffect(() => {
        if (!isLoggedin) {
            navigate("/login");
        }
    }, [isLoggedin, navigate, isClicked]);
    // useEffect(() => {
    //     if (data) {
    //         updateDevices(data);
    //     }
    // }, [data, updateDevices]);

    // FORM
    const [name, setName] = useState('');
    const [type, setType] = useState('Switch');
    const [ip, setIP] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem('user');
        return storedToken ? JSON.parse(storedToken) : null;
    });

    function handleSubmit(e) {
        e.preventDefault();

        const device = { name, type, ip, location, description };
        console.log('device:')
        console.log(device);

        if (name && type && ip && location) {
            fetch(backend + '/api/devices', {
                method: 'POST',
                body: JSON.stringify(device),
                headers: {
                    Authorization: `Bearer ${ token }`,
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                if (res.status === 401) {
                    handleOpen();
                    toggleLogout();
                    console.log('toggle logout called by HOME LINE 110')
                } else if (!res.ok) {
                    handleOpen();
                    console.log('status: ')
                    console.log(res.status);
                    throw Error('Could not fetch the data for that resource');
                }
                return res.json();
            }).then((data) => {
                handleOpen();
                Toast('success', 'Device Added!');
                setIsClicked(!isClicked);
            }).catch(err => {
                handleOpen();
                Toast('error', err);
            });
        }

    };

    return (
        <div className="home">
            <ComplexNavbar />

            { isPending && <div className='flex items-center justify-center z-50'><Spinner /></div> }

            { error && Toast('error', error) }

            { devices && <>
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row fixed right-10 bottom-10 z-10">
                        <Button className="flex items-center gap-3 text-lg" size="sm" onClick={ handleOpen }>
                            <PlusIcon strokeWidth={ 2 } className="h-4 w-4" /> Add Device
                        </Button>
                    </div>
                </div>

                <Overview data={ devices } />

                <div className="main-table mx-14 my-10">
                    <SortableTable filter={ '' } />
                </div>

                {/* <AddDeviceForm open={ open } handleOpen={ handleOpen } />
                 */}
                <Dialog open={ open } handler={ handleOpen }>
                    <DialogHeader>Add a New Device!</DialogHeader>
                    <DialogBody>
                        <form className="bg-white px-8 pt-6 pb-8 mb-4" onSubmit={ handleSubmit }>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Name <span className="text-red-400">*</span>
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    required
                                    value={ name }
                                    onChange={ (e) => setName(e.target.value) }
                                    placeholder="Name" />
                            </div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Device Type <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"

                                    id="type"
                                    required
                                    value={ type }
                                    onChange={ (e) => setType(e.target.value) }
                                >
                                    <option>Switch</option>
                                    <option>Access Point</option>
                                    <option>Domain</option>
                                    <option>Others</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                            <div className="my-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    IP address <span className="text-red-400">*</span>
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="ip"
                                    type="text"
                                    placeholder="IP Address"
                                    required
                                    value={ ip }
                                    onChange={ (e) => setIP(e.target.value) }
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Location <span className="text-red-400">*</span>
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="location"
                                    type="text"
                                    placeholder="Location of Device"
                                    required
                                    value={ location }
                                    onChange={ (e) => setLocation(e.target.value) }
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Description
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="description"
                                    type="text"
                                    placeholder="Description of Device"
                                    value={ description }
                                    onChange={ (e) => setDescription(e.target.value) }
                                />
                            </div>

                            <div className="flex items-center justify-center mx-4">
                                {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Add Device
                            </button> */}
                                { !isPending && <Button className="flex items-center gap-6 px-6 py-3 mt-4 text-sm" size="sm" onClick={ handleSubmit } type='submit'>
                                    Add Device
                                </Button> }
                                { isPending && <Button className="flex items-center gap-6 px-6 py-3 mt-4 text-sm" size="sm" onClick={ handleSubmit } type='submit'>
                                    Add Device
                                </Button> }
                            </div>
                        </form>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={ handleOpen }
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
            </> }

            <ToastBox />
        </div>
    );
}

export default Home;
