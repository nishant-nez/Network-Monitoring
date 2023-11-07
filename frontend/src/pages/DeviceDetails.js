import { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import useFetch from "../hooks/useFetch";
import ComplexNavbar from "../components/ComplexNavbar";
import { Spinner } from '@material-tailwind/react';
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import { Typography } from "@material-tailwind/react";


const DeviceDetails = () => {
    document.title = "Home | Network Monitoring";

    const { id } = useParams();
    const navigate = useNavigate();

    const [groupedData, setGroupedData] = useState({});
    const [dailyResponse, setDailyResponse] = useState([]);
    const [downs, setDowns] = useState(0);

    const { isLoggedin, toggleLogin, toggleLogout } = useContext(AuthContext);
    const { data, isPending, error } = useFetch('/api/devices/' + id);
    const { data: historyData, isPending: historyIsPending, error: historyError } = useFetch('/api/history/' + id);

    useEffect(() => {
        if (!isLoggedin) {
            navigate("/login");
        }
    }, [isLoggedin, navigate]);

    useEffect(() => {
        setGroupedData({});
        const tempData = {};
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
    }, [historyData]);



    return (
        <>
            <ComplexNavbar />
            { isPending && historyIsPending && <Spinner /> }

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
            { historyError && toast.error(`Error: ${ historyError }`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }) }

            { data && historyData &&
                <>
                    <div className="flex items-center justify-center gap-10 w-[100%]">
                        <div className="overview ml-14 my-12 bg-white rounded-lg shadow-md p-10 hover:shadow-lg w-[100%]">
                            <LineChart data={ dailyResponse } />
                        </div>
                        <div className="overview mr-14 my-12 bg-white rounded-lg shadow-md p-8 hover:shadow-lg w-[100%]">
                            <PieChart data={ { downs: downs, total: historyData.length } } />
                        </div>
                    </div>

                    <div className="overview mx-14 bg-white rounded-lg shadow-md p-10 hover:shadow-lg">
                        <Typography variant="h5" color="blue-gray" className="mb-4">
                            Device Details
                        </Typography>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            { data.name }
                        </Typography>
                        <Typography variant="h6" color="blue-gray" className="mb-2">
                            { data.type }
                        </Typography>
                        <div>
                            <div className="flex items-center">
                                <Typography variant="paragraph">
                                    IP: &nbsp;
                                </Typography>
                                <Typography variant="small">
                                    { data.ip }
                                </Typography>
                            </div>
                            <div className="flex items-center">
                                <Typography variant="paragraph">
                                    Location: &nbsp;
                                </Typography>
                                <Typography variant="small">
                                    { data.location }
                                </Typography>
                            </div>
                            <div className="flex items-center">
                                <Typography variant="paragraph">
                                    Current Status: &nbsp;
                                </Typography>
                                { data.status === 'up'
                                    ?
                                    <Typography variant="paragraph" color="green">
                                        up
                                    </Typography>
                                    :
                                    <Typography variant="paragraph" color="red">
                                        down
                                    </Typography>
                                }
                            </div>
                            <div className="flex items-center">
                                <Typography variant="paragraph">
                                    Date Added: &nbsp;
                                </Typography>
                                <Typography variant="small">
                                    { data.createdAt }
                                </Typography>
                            </div>
                            <div className="flex items-center">
                                <Typography variant="paragraph">
                                    Last Updated: &nbsp;
                                </Typography>
                                <Typography variant="small">
                                    { data.updatedAt }
                                </Typography>
                            </div>
                        </div>

                    </div>

                    <div className="content">
                        { console.log('history:\n', historyData) }
                        { console.log('data:\n', data) }
                        { console.log('GROUPED DATA:\n', groupedData) }
                        { console.log('DAILY RESPONSE:\n', dailyResponse) }

                    </div>
                </>
            }

            <ToastContainer className="z-50"
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
        </>
    );
}

export default DeviceDetails;