import { formatDistanceToNow } from "date-fns";
import { useContext, useState, useEffect } from "react";
import { DeviceContext } from "../contexts/DeviceContext";
import { Spinner } from "@material-tailwind/react";
import DevicesTable from "./DevicesTable";

const TABS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Up",
        value: "up",
    },
    {
        label: "Down",
        value: "down",
    },
];

const TABLE_HEAD = ["Name", "IP", "Type", "Status", "Response Time", "Last Updated", ""];

const TimeAgo = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
}
const TimeAgoNoSuffix = (date) => {
    return formatDistanceToNow(new Date(date));
}

export default function SortableTable(props) {
    const [selectedTab, setSelectedTab] = useState('all');
    const { devices, updateDevices, isPending, error } = useContext(DeviceContext);
    // console.log('devices: ' + devices)
    const [data, setData] = useState(devices);
    // console.log('data: ' + data)
    const TABLE_ROWS = [];

    // Use useEffect to update data when the selected tab or devices change
    useEffect(() => {
        setData(devices);
        if (devices) {
            // Filter data based on the selected tab
            let filteredData = devices;

            if (selectedTab === 'all') {
                // No tab filtering
            } else if (selectedTab === 'up') {
                filteredData = devices.filter((device) => device.status === 'up');
            } else {
                filteredData = devices.filter((device) => device.status === 'down');
            }

            // Filter based on props.filter if it's not an empty string
            if (props.filter !== '') {
                filteredData = filteredData.filter((device) => device.type === props.filter);
                // Set the filtered data to state
            }

            setData(filteredData);
            console.log('devices: ', devices)
            // console.log('CURRENT DATA : ', )
        }
    }, [selectedTab, devices, props.filter]);

    if (data && data.title !== 'Unauthorized') {
        data.map((item) => {
            TABLE_ROWS.push({
                id: item._id,
                name: item.name,
                location: item.location,
                ip: item.ip,
                type: item.type,
                status: item.status,
                responseTime: item.responseTime === '-1' ? 'n/a' : item.responseTime + 'ms',
                lastUpdated: item.status === 'down' ? '(Down since) ' + TimeAgoNoSuffix(item.updatedAt) : TimeAgo(item.updatedAt),
            });
            return item;
        });

        TABLE_ROWS.sort((a, b) => {
            if (a.status === 'down' && b.status !== 'down') {
                return -1; // 'down' comes before other statuses
            } else if (a.status !== 'down' && b.status === 'down') {
                return 1; // Other statuses come after 'down'
            } else {
                return 0; // Maintain the order for other statuses
            }
        });
    }

    const handleTabChange = (value) => {
        setSelectedTab(value);
    };

    return (
        <>
            { isPending && <Spinner /> }
            { data &&
                <DevicesTable
                    selectedTab={ selectedTab }
                    handleTabChange={ handleTabChange }
                    data={ data }
                    TABLE_HEAD={ TABLE_HEAD }
                    TABLE_ROWS={ TABLE_ROWS }
                    TABS={ TABS }
                />
            }
        </>
    );
}