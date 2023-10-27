import { formatDistanceToNow } from "date-fns";
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";

const TABS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Monitored",
        value: "monitored",
    },
    {
        label: "Unmonitored",
        value: "unmonitored",
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
    const data = props.data;
    const TABLE_ROWS = [];

    data.map((item) => {
        console.log(item.ip);
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

    return (
        <Card className="h-full max-h-[100vh] w-full">
            { !data && <div>No data found!</div> }
            { data &&
                <>


                    <CardHeader floated={ false } shadow={ false } className="rounded-none pt-2">
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                            <Tabs value="all" className="w-full md:w-max">
                                <TabsHeader>
                                    { TABS.map(({ label, value }) => (
                                        <Tab key={ value } value={ value }>
                                            &nbsp;&nbsp;{ label }&nbsp;&nbsp;
                                        </Tab>
                                    )) }
                                </TabsHeader>
                            </Tabs>
                            <div className="w-full md:w-72">
                                <Input
                                    label="Search"
                                    icon={ <MagnifyingGlassIcon className="h-5 w-5" /> }
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className="overflow-scroll px-0">
                        <table className="mt-4 w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    { TABLE_HEAD.map((head, index) => (
                                        <th
                                            key={ head }
                                            className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                            >
                                                { head }{ " " }
                                                { index !== TABLE_HEAD.length - 1 && (
                                                    <ChevronUpDownIcon strokeWidth={ 2 } className="h-4 w-4" />
                                                ) }
                                            </Typography>
                                        </th>
                                    )) }
                                </tr>
                            </thead>
                            <tbody>
                                { TABLE_ROWS.map(
                                    ({ id, name, location, type, ip, status, responseTime, lastUpdated }, index) => {
                                        const isLast = index === TABLE_ROWS.length - 1;
                                        const classes = isLast
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={ id }>
                                                <td className={ classes }>
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex flex-col">
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            >
                                                                { name }
                                                            </Typography>
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal opacity-70"
                                                            >
                                                                { location }
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={ classes }>
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            { ip }
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={ classes }>
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            { type }
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={ classes }>
                                                    <div className="w-max">
                                                        <Chip
                                                            variant="ghost"
                                                            size="sm"
                                                            value={ status }
                                                            // color={ online ? "green" : "blue-gray" }
                                                            color={
                                                                status === 'up'
                                                                    ? 'green'
                                                                    : status === 'down'
                                                                        ? 'red'
                                                                        : 'blue-gray'
                                                            }
                                                        />
                                                    </div>
                                                </td>
                                                <td className={ classes }>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        { responseTime }
                                                    </Typography>
                                                </td>
                                                <td className={ classes }>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        { lastUpdated }
                                                    </Typography>
                                                </td>
                                                <td className={ classes }>
                                                    <Tooltip content="Edit Device">
                                                        <IconButton variant="text">
                                                            <PencilIcon className="h-4 w-4" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                        );
                                    },
                                ) }
                            </tbody>
                        </table>
                    </CardBody>
                    {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page 1 of 10
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm">
                        Previous
                    </Button>
                    <Button variant="outlined" size="sm">
                        Next
                    </Button>
                </div>
            </CardFooter> */}
                </>
            }
        </Card>
    );
}