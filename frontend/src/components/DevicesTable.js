import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CiCircleInfo } from "react-icons/ci";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    CardBody,
    Chip,
    Tabs,
    TabsHeader,
    Tab,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";

const DevicesTable = ({ selectedTab, handleTabChange, data, TABLE_HEAD, TABLE_ROWS, TABS }) => {
    return (
        <Card className="h-full max-h-[100vh] w-full">
            <CardHeader floated={ false } shadow={ false } className="rounded-none pt-2">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <Tabs value={ selectedTab } className="w-full md:w-max">
                        <TabsHeader>
                            { TABS.map(({ label, value }) => (
                                <Tab
                                    key={ value }
                                    value={ value }
                                    onClick={ () => handleTabChange(value) }
                                >
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
            { !data && <div className="p-8 text-center">Database is Empty!</div> }
            { TABLE_ROWS.length === 0 && <div className="p-8 text-center">Empty!</div> }
            { data && data !== '' && TABLE_ROWS.length !== 0 &&
                <>
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
                                                    <Link to={ '/device/' + id }>
                                                        <Tooltip content="Edit Device">
                                                            <IconButton variant="text">
                                                                {/* <PencilIcon className="h-4 w-4" /> */ }
                                                                <CiCircleInfo className="h-6 w-6" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    },
                                ) }
                            </tbody>
                        </table>
                    </CardBody>
                </>
            }
        </Card>
    );
}

export default DevicesTable;