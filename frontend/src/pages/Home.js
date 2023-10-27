import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext";
import { Spinner } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';
import ComplexNavbar from '../components/ComplexNavbar';
import SortableTable from '../components/SortableTable';
import useFetch from '../hooks/useFetch';
import {
    Typography, Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { PencilIcon, UserPlusIcon, PlusIcon, UserIcon } from "@heroicons/react/24/solid";
import AddDeviceForm from "../components/AddDeviceForm";


const Home = () => {
    const navigate = useNavigate();
    const { isLoggedin, toggleLogin, toggleLogout } = useContext(AuthContext);
    // const [data, setData] = useState(null);
    const { data, isPending, error } = useFetch('/api/devices');

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    console.log('Home Component Rendered');
    console.log('Is Logged in:', isLoggedin);

    useEffect(() => {
        if (!isLoggedin) {
            navigate("/login");
        }

    }, [isLoggedin, navigate]);

    // FORM
    const [name, setName] = useState('');
    const [type, setType] = useState('Switch');
    const [ip, setIP] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const device = { name, type, ip, location, description };
        console.log('device:')
        console.log(device);
    };

    return (
        <div className="home">
            <ComplexNavbar />

            { isPending && <Spinner /> }

            { error && toast.error(`Error: ${ error }`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }) }

            { data && <>
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row absolute right-10 bottom-10">
                        <Button className="flex items-center gap-3 text-lg z-10" size="sm" onClick={ handleOpen }>
                            <PlusIcon strokeWidth={ 2 } className="h-4 w-4" /> Add Device
                        </Button>
                    </div>
                </div>

                <div className="overview mx-14 bg-white rounded-lg shadow-lg p-10">
                    <Typography>
                        <h1 className="text-2xl font-bold text-gray-800 pb-6">Overview</h1>
                    </Typography>
                    <div className="flex flex-col min-w-full sm:flex-row md:flex-row">
                        <div className="count-card flex items-center gap-4 mr-6 bg-[#49596a] rounded-lg p-4 min-w-[200px]">
                            <img src={ process.env.PUBLIC_URL + './switch.png' } alt="" />
                            <div className="count-content text-center">
                                <h1 className="text-base font-bold text-white">SWITCHES</h1>
                                <div className='text-gray-100'>
                                    { data.filter(device => device.type === 'Switch').length }
                                </div>
                            </div>
                        </div>
                        <div className="count-card flex items-center gap-4 mr-6 bg-[#49596a] rounded-lg p-4 w-[200px]">
                            <img src={ process.env.PUBLIC_URL + './ap.png' } alt="" />
                            <div className="count-content text-center">
                                <h1 className="text-base font-bold text-white">AP's</h1>
                                <div className='text-gray-100'>
                                    { data.filter(device => device.type === 'Access Point').length }
                                </div>
                            </div>
                        </div>
                        <div className="count-card flex items-center gap-4 mr-6 bg-[#49596a] rounded-lg p-4 min-w-[200px]">
                            <img src={ process.env.PUBLIC_URL + './computer.png' } alt="" />
                            <div className="count-content text-center">
                                <h1 className="text-base font-bold text-white">OTHER</h1>
                                <div className='text-gray-100'>
                                    { data.filter(device => device.type !== 'Switch' && device.type !== 'Access Point').length }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="main-table mx-14 my-10">
                    <SortableTable data={ data } />
                </div>
                <h2>Home Page</h2>
                <p>Is Logged in: { isLoggedin ? 'true' : 'false' }</p>
                <button onClick={ toggleLogin }>Login</button>
                <button onClick={ toggleLogout }>Logout</button>

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
                                { !isPending && <Button className="flex items-center gap-6 px-6 py-3 mt-4 text-sm" size="sm" onClick={ () => { } }>
                                    Add Device
                                </Button> }
                                { isPending && <Button className="flex items-center gap-6 px-6 py-3 mt-4 text-sm" size="sm" onClick={ () => { } }>
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
                        {/* <Button variant="gradient" color="green" onClick={ props.handleOpen }>
                        <span>Confirm</span>
                    </Button> */}
                    </DialogFooter>
                </Dialog>
            </> }

            <ToastContainer
                position="bottom-right"
                autoClose={ 5000 }
                hideProgressBar={ false }
                newestOnTop={ false }
                closeOnClick
                rtl={ false }
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default Home;