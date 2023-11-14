import { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Toast, ToastBox } from "../components/Toast";
import NotificationTable from "../components/NotificationTable";
import useFetch from "../hooks/useFetch";
import ComplexNavbar from "../components/ComplexNavbar";
import { Spinner } from '@material-tailwind/react';
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import { backend } from '../constants';
import { format, parseISO } from 'date-fns';
import {
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Tooltip,
} from "@material-tailwind/react";
import { PencilIcon, UserPlusIcon, PlusIcon, UserIcon } from "@heroicons/react/24/solid";


const DeviceDetails = () => {
    document.title = "Device Details | Network Monitoring";

    const { id } = useParams();
    const navigate = useNavigate();

    const [groupedData, setGroupedData] = useState({});
    const [dailyResponse, setDailyResponse] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [downs, setDowns] = useState(0);

    // FORM
    const [isClicked, setIsClicked] = useState(false);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [ip, setIP] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem('user');
        return storedToken ? JSON.parse(storedToken) : null;
    });

    //

    const { isLoggedin, toggleLogin, toggleLogout } = useContext(AuthContext);
    const { data, isPending, error } = useFetch('/api/devices/' + id);
    const { data: notificationsData, isPending: notificationIsPending, error: notificationsError } = useFetch('/api/notification/' + id);
    const { data: historyData, isPending: historyIsPending, error: historyError } = useFetch('/api/history/' + id);

    useEffect(() => {
        if (!isLoggedin) {
            navigate("/login");
        }
    }, [isLoggedin, navigate]);

    useEffect(() => {
        setGroupedData({});
        const tempData = {};

        if (data) {
            setName(data.name);
            setType(data.type);
            setIP(data.ip);
            setLocation(data.location);
            setDescription(data.description);
        }

        if (historyData) {
            historyData.forEach(obj => {
                const timestamp = new Date(obj.timestamp);
                const date = timestamp.toISOString().slice(0, 10);

                if (!tempData[date]) {
                    tempData[date] = [];
                }

                tempData[date].push(obj);
            });
            setGroupedData(tempData);

            // average response times
            const tempDailyResponse = [];
            for (const date in groupedData) {
                if (groupedData.hasOwnProperty(date)) {
                    const objects = groupedData[date];
                    let totalResponse = 0;

                    objects.forEach(obj => {
                        if (obj.responseTime && obj.responseTime !== '-1')
                            totalResponse += parseFloat(obj.responseTime);
                    });

                    const averageResponse = parseFloat(totalResponse / objects.length).toFixed(2);
                    tempDailyResponse.push({ date, averageResponse });
                }
            }
            setDailyResponse(tempDailyResponse);

            // downs
            let count = 0;
            historyData.forEach(obj => {
                if (obj.status === 'down') {
                    count += 1;
                }
            });
            setDowns(count);
        }

        if (notificationsData) {
            setNotifications(notificationsData);
            console.log('notifications from effect$%: ', notifications);
        }
        console.log('notifications from effect: ', notifications);
        console.log('notificationdata: ', notificationsData);
    }, [historyData, data, notificationsData]);


    // FORM
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    function handleDelete(e) {
        e.preventDefault();

        fetch(backend + '/api/devices/' + id, {
            method: 'DELETE',
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
                throw Error('Could not delete device');
            }
            return res.json();
        }).then((data) => {
            handleOpen();
            Toast('success', 'Device Deleted!')
            navigate('/');
            setIsClicked(!isClicked);
        }).catch(err => {
            handleOpen();
            Toast('error', err)
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        const device = { name, type, ip, location, description };

        fetch(backend + '/api/devices/' + id, {
            method: 'PUT',
            body: JSON.stringify(device),
            headers: {
                Authorization: `Bearer ${ token }`,
                'Content-Type': 'application/json',
            }
        }).then(res => {
            console.log("inside fetch")
            if (res.status === 401) {
                handleOpen();
                toggleLogout();
                console.log('toggle logout called by HOME LINE 110')
            } else if (!res.ok) {
                handleOpen();
                console.log('status: ')
                console.log(res.status);
                throw Error('Could not update the device');
            }
            return res.json();
        }).then((data) => {
            handleOpen();
            Toast('success', 'Device Updated!')
            setIsClicked(!isClicked);
        }).catch(err => {
            handleOpen();
            Toast('error', err)
        });

    };



    return (
        <>
            <ComplexNavbar />
            { isPending && historyIsPending && <Spinner /> }

            { error && Toast('error', error) }
            { historyError && Toast('error', historyError) }

            { data && historyData &&
                <>
                    {/* Grid Start */ }
                    <div className="grid grid-cols-1 gap-10 mx-14 my-10 md:grid-cols-2">
                        <Tooltip
                            content="Line Chart for Average Response Time"
                            animate={ {
                                mount: { scale: 1, y: 0 },
                                unmount: { scale: 0, y: 25 },
                            } }
                        >
                            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg">
                                <LineChart data={ dailyResponse } />
                            </div>
                        </Tooltip>
                        <Tooltip
                            content="Pie Chart for Uptime and Downtime"
                            animate={ {
                                mount: { scale: 1, y: 0 },
                                unmount: { scale: 0, y: 25 },
                            } }
                        >
                            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg">
                                <PieChart data={ { downs: downs, total: historyData.length } } />
                            </div>
                        </Tooltip>

                        <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg">
                            <div className="p-6 w-[90%]">
                                <Typography variant="h4" color="blue-gray" className="mb-4 border-b-2 text-center">
                                    Device Details
                                </Typography>
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    { data.name }
                                </Typography>
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    { data.type }
                                </Typography>

                                <div className="flex items-center justify-between">
                                    <Typography variant="paragraph">
                                        IP: <br />
                                        Location <br />
                                        Current Status: <br />
                                        Current Response Time: <br />
                                        Date Added: <br />
                                        Last Updated: <br />
                                    </Typography>
                                    <Typography variant="paragraph" className="">
                                        { data.ip } <br />
                                        { data.location } <br />
                                        { data.status === 'up'
                                            ?
                                            <span style={ { color: "green" } }>
                                                up
                                            </span>
                                            :
                                            <span style={ { color: "red" } }>
                                                down
                                            </span>
                                        } <br />
                                        { data.responseTime === '-1' ? '(currently down)' : data.responseTime + ' ms' } <br />
                                        { format((parseISO(data.createdAt)), "h:mm a | d-LLLL-yyyy") }<br />
                                        { format((parseISO(data.updatedAt)), "h:mm a | d-LLLL-yyyy") } <br />
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <Tooltip
                            content="Recent Email Notifications Sent"
                            animate={ {
                                mount: { scale: 1, y: 0 },
                                unmount: { scale: 0, y: 25 },
                            } }
                        >
                            <div>
                                { notificationIsPending && <Spinner /> }
                                { console.log('notifications: ', notifications) }
                                { (!notifications || notifications.length === 0) &&
                                    <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg h-full">
                                        <div className="flex justify-center items-center h-full">
                                            <Typography variant="small" color="blue-gray" className="text-center">
                                                No recent notifications.
                                            </Typography>
                                        </div>
                                    </div>
                                }
                                {/* <NotificationTable /> */ }
                                { notifications && notifications.length > 0 &&
                                    <div className="bg-white rounded-lg hover:shadow-lg">
                                        <NotificationTable data={ notifications } />
                                    </div>
                                }
                            </div>
                        </Tooltip>
                    </div>
                    {/* Grid End */ }

                    {/* Edit Device Form */ }
                    <Dialog open={ open } handler={ handleOpen }>
                        <DialogHeader>Update Device!</DialogHeader>
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
                                    { !isPending && <Button className="flex items-center gap-6 px-6 py-3 mt-4 text-sm" size="sm" onClick={ handleSubmit } type='submit'>
                                        Update Device
                                    </Button> }
                                    { isPending && <Button className="flex items-center gap-6 px-6 py-3 mt-4 text-sm" size="sm" onClick={ handleSubmit } type='submit'>
                                        Update Device
                                    </Button> }
                                </div>
                                <div className="flex items-center justify-center mx-4">
                                    { !isPending && <Button className="flex items-center gap-6 px-6 py-3 mt-4 text-sm bg-red-400" size="sm" onClick={ handleDelete } type='submit'>
                                        Delete Device
                                    </Button> }
                                    { isPending && <Button className="flex items-center gap-6 px-6 py-3 mt-4 text-sm bg-red-400" size="sm" onClick={ handleDelete } type='submit'>
                                        Delete Device
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

                    {/* Edit Device Button */ }
                    <div>
                        <div className="mb-8 flex items-center justify-between gap-8">
                            <div className="flex shrink-0 flex-col gap-2 sm:flex-row fixed right-10 bottom-10 z-10">
                                <Button className="flex items-center gap-3 text-lg" size="sm" onClick={ handleOpen }>
                                    <PencilIcon strokeWidth={ 2 } className="h-4 w-4" /> Edit Device
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* <div className="content">
                        { console.log('history:\n', historyData) }
                        { console.log('data:\n', data) }
                        { console.log('GROUPED DATA:\n', groupedData) }
                        { console.log('DAILY RESPONSE:\n', dailyResponse) }

                    </div> */}
                </>
            }

            <ToastBox />
        </>
    );
}

export default DeviceDetails;