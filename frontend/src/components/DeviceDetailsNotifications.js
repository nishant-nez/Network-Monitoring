import React from "react";
import { Spinner, Typography, Tooltip } from "@material-tailwind/react";
import NotificationTable from "./NotificationTable";

const DeviceDetailsNotifications = ({ notificationIsPending, notifications }) => {
    return (
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
    );
}

export default DeviceDetailsNotifications;