import React from "react";
import { Tooltip } from "@material-tailwind/react";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

const DeviceDetailsCharts = ({ dailyResponse, downs, historyData }) => {
    return (
        <>
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
        </>
    );
}

export default DeviceDetailsCharts;