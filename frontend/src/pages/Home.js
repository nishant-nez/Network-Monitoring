import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext";
import { DeviceContext } from '../contexts/DeviceContext';
import ComplexNavbar from '../components/ComplexNavbar';
import SortableTable from '../components/SortableTable';
import AddDeviceForm from '../components/AddDeviceForm';
import { backend } from '../constants';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";
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

    useEffect(() => {
        if (!isLoggedin) {
            console.log("-------------navigate to /login called by home line 73");
            console.log('isLoggedin: ', isLoggedin);
            navigate("/login");
        } else {
            // updateDevices();
        }
    }, [isLoggedin, navigate, isClicked]);
    // useEffect(() => {
    //     if (data) {
    //         updateDevices(data);
    //     }
    // }, [data, updateDevices]);

    // FORM
    const [addPending, setAddPending] = useState(false);
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
            setAddPending(true);
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
                    setAddPending(false);
                    console.log("----------------------toggleLogout() called by Home LINE 114");
                    toggleLogout();
                } else if (!res.ok) {
                    handleOpen();
                    setAddPending(false);
                    console.log('status: ')
                    console.log(res.status);
                    throw Error('Could not fetch the data for that resource');
                }
                return res.json();
            }).then((data) => {
                handleOpen();
                setAddPending(false);
                setName('');
                setIP();
                setLocation('');
                setDescription('');
                updateDevices();
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
            { !isLoggedin && navigate("/login") }
            <ComplexNavbar />

            {/* { isPending && <div className='flex items-center justify-center z-50'><Spinner /></div> } */ }

            {/* { error && Toast('error', error) } */ }

            { <>
                {/* { devices.length === 0 && navigate('/') } */ }
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row fixed right-10 bottom-10 z-10">
                        <Button className="flex items-center gap-3 text-lg" size="lg" onClick={ handleOpen }>
                            <PlusIcon strokeWidth={ 4 } className="h-6 w-6" /> Add Device
                        </Button>
                    </div>
                </div>

                <Overview />

                <div className="main-table mx-14 my-10">
                    <SortableTable filter={ '' } />
                </div>

                {/* <AddDeviceForm open={ open } handleOpen={ handleOpen } />
                 */}
                <Dialog open={ open } handler={ handleOpen }>
                    <DialogHeader>Add a New Device!</DialogHeader>
                    <AddDeviceForm
                        handleSubmit={ handleSubmit }
                        name={ name }
                        type={ type }
                        ip={ ip }
                        location={ location }
                        description={ description }
                        setName={ setName }
                        setType={ setType }
                        setIP={ setIP }
                        setLocation={ setLocation }
                        setDescription={ setDescription }
                        addPending={ addPending }
                    />
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
