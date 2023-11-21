import { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Toast, ToastBox } from "../components/Toast";
import useFetch from "../hooks/useFetch";
import ComplexNavbar from "../components/ComplexNavbar";
import { Spinner } from '@material-tailwind/react';
import EditDeviceForm from "../components/EditDeviceForm";
import { backend } from '../constants';
import {
    Button,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import DeviceDetailsCharts from "../components/DeviceDetailsCharts";
import DeviceDetailsCard from "../components/DeviceDetailsCard";
import DeviceDetailsNotifications from "../components/DeviceDetailsNotifications";


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

    const { isLoggedin, toggleLogout } = useContext(AuthContext);
    const { data, isPending, error } = useFetch('/api/devices/' + id);
    const { data: notificationsData, isPending: notificationIsPending, error: notificationsError } = useFetch('/api/notification/' + id);
    const { data: historyData, isPending: historyIsPending, error: historyError } = useFetch('/api/history/' + id);

    useEffect(() => {
        if (!isLoggedin) {
            console.log("-------------navigate to /login called by devicedetails line 58");
            console.log('isLoggedin: ', isLoggedin);
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
            for (const date in tempData) {
                if (tempData.hasOwnProperty(date)) {
                    const objects = tempData[date];
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
                console.log("----------------------toggleLogout() called by DeviceDetails LINE 140");
                toggleLogout();
            } else if (!res.ok) {
                handleOpen();
                console.log('status: ')
                console.log(res.status);
                throw Error('Could not delete device');
            }
            return res.json();
        }).then((data) => {
            handleOpen();
            Toast('success', 'Device Deleted!');
            console.log("-------------navigate to / called by devicedetails line 153");
            console.log('isLoggedin: ', isLoggedin);
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
                console.log("----------------------toggleLogout() called by DeviceDetails LINE 176");
                toggleLogout();
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
            { !isLoggedin && navigate('/login') }
            { isLoggedin &&
                <>

                    <ComplexNavbar />
                    { (isPending || historyIsPending) &&
                        <div className="w-full min-h-[90vh] flex items-center justify-center">
                            <Spinner className="h-20 w-20" />
                        </div>
                    }

                    { error && Toast('error', error) }
                    { historyError && Toast('error', historyError) }
                    { notificationsError && Toast('error', notificationsError) }

                    { data && historyData &&
                        <>
                            {/* Grid Start */ }
                            <div className="grid grid-cols-1 gap-10 mx-14 my-10 md:grid-cols-2">
                                <DeviceDetailsCharts
                                    dailyResponse={ dailyResponse }
                                    downs={ downs }
                                    historyData={ historyData }
                                />
                                <DeviceDetailsCard data={ data } />
                                <DeviceDetailsNotifications notificationIsPending={ notificationIsPending } notifications={ notifications } />
                            </div>
                            {/* Grid End */ }

                            {/* Edit Device Form */ }
                            <EditDeviceForm
                                handleDelete={ handleDelete }
                                handleSubmit={ handleSubmit }
                                open={ open }
                                handleOpen={ handleOpen }
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
                                isPending={ isPending }
                            />

                            {/* Edit Device Button */ }
                            <div>
                                <div className="mb-8 flex items-center justify-between gap-8">
                                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row fixed right-10 bottom-10 z-10">
                                        <Button className="flex items-center gap-3 text-lg" size="lg" onClick={ handleOpen }>
                                            <PencilIcon strokeWidth={ 4 } className="h-6 w-6" /> Edit Device
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </>
                    }

                    <ToastBox />
                </>
            }
        </>
    );
}

export default DeviceDetails;