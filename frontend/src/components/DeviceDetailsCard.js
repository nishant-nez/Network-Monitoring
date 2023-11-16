import React from "react";
import { Typography, Tooltip } from "@material-tailwind/react";
import { format, parseISO } from 'date-fns';

const DeviceDetailsCard = ({ data }) => {
    return (
        <Tooltip
            content="Device Details"
            animate={ {
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
            } }
        >
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
        </Tooltip>
    );
}

export default DeviceDetailsCard;