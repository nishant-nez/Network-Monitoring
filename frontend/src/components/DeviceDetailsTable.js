import { Card, Typography, Chip } from "@material-tailwind/react";

const TABLE_HEAD = ["Name", "IP", "Type", "Status"];

const DeviceDetailsTable = ({ data, location }) => {
    return (
        <>
            <Typography
                variant="h6"
                className="p-2"
            >
                { location }
            </Typography>
            <Card className="w-full overflow-hidden">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            { TABLE_HEAD.map((head) => (
                                <th
                                    key={ head }
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        { head }
                                    </Typography>
                                </th>
                            )) }
                        </tr>
                    </thead>
                    <tbody>
                        { data.map(({ name, ip, type, status }, index) => {
                            const isLast = index === data.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={ name }>
                                    <td className={ classes }>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            { name }
                                        </Typography>
                                    </td>
                                    <td className={ classes }>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            { ip }
                                        </Typography>
                                    </td>
                                    <td className={ classes }>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            { type }
                                        </Typography>
                                    </td>
                                    <td className={ classes }>
                                        <div className="w-max">
                                            <Chip
                                                variant="ghost"
                                                size="sm"
                                                value={ status }
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
                                </tr>
                            );
                        }) }
                    </tbody>
                </table>
            </Card>
        </>
    );
}

export default DeviceDetailsTable;
