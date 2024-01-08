import ComplexNavbar from "../components/ComplexNavbar";
import React from "react";
// import ReactDOM from "react-dom";
import Graph from "react-vis-network-graph";
import graphData from "../networkMap.json";
import { useState, useMemo, useContext } from "react";
import { isEmpty } from "lodash";
import { DeviceContext } from "../contexts/DeviceContext";
import DeviceDetailsTable from "../components/DeviceDetailsTable";

const NetworkMap = () => {
    document.title = "Network Map | Network Monitoring";
    const { devices, updateDevices, isPending, error } = useContext(DeviceContext);
    const [selectedNode, setSelectedNode] = useState("No node selected");
    const [selectedLocation, setSelectedLocation] = useState('');
    const [deviceList, setDeviceList] = useState([]);
    // let selectedNode = "No node selected";

    const red = '#e04141';
    const green = '#5fd041';

    // const userIds = new Set();
    // const [graphKey, setGraphKey] = useState(v7());

    const modifiedGraphData = useMemo(() => {
        const deepCopy = JSON.parse(JSON.stringify(graphData));

        deepCopy.nodes.forEach((node) => {
            const hasDownStatus = devices.some((device) => {
                return device.location === node.title && device.status === 'down';
            });

            node.group = hasDownStatus ? 'down' : 'up';
        });

        return deepCopy.nodes;
    }, [graphData, devices]);
    // console.log("main data: ", graphData);
    // console.log(modifiedGraphData);

    const options = {
        layout: {
            hierarchical: false
        },
        edges: {
            color: "#000000",
            width: 1,
            length: 170,
            arrows: {
                to: { enabled: true, type: "arrow" },
                middle: { enabled: false, scaleFactor: 1, type: "arrow" },
                from: { enabled: false, scaleFactor: 1, type: "arrow" },
            },
        },

        // margin: 10,
        width: "100%",
        nodes: {
            margin: 16,
            borderWidthSelected: 4,
            font: {
                size: 26,
                fontWeight: 'bold',
            },
            color: {
                background: 'white',
                border: 'red',
                highlight: {
                    background: 'pink',
                    border: 'red'
                }
            },
            shape: 'circle',
        },
        groups: {
            building: {
                shape: 'database',
                font: {
                    size: 22,
                    fontWeight: 'bold',
                }
            },
            up: {
                className: 'custom-node-up',
                color: green,
                font: {
                    color: '#e5e5e5',
                    size: 22,
                    fontWeight: 'bold',
                },
            },
            down: {
                className: 'custom-node-up',
                color: red,
                font: {
                    color: '#e5e5e5',
                    size: 22,
                },
                margin: 10,
            }
        },
        physics: {
            enabled: true,
            hierarchicalRepulsion: {
                nodeDistance: 200,
                springLength: 200
            },
            barnesHut: {
                gravitationalConstant: -3000,
                centralGravity: 0.3,
                springLength: 150,
                springConstant: 0.04,
                damping: 0.09,
                avoidOverlap: 0.7,
            },
        },
    };



    const handleNodeClick = (nodes) => {
        console.log("HANDLE NODE CLICK FUNCTION CALLED! WITH NODE: ", nodes[0]);
        console.log(devices);
        console.log(modifiedGraphData);
        // setSelectedNode(nodes);
        const clickedNode = modifiedGraphData.find((node) => node.id === nodes[0]);
        if (clickedNode) {
            setDeviceList(devices.filter((device) =>
                device.location === clickedNode.title
            ));
            setSelectedLocation(clickedNode.title);
        }
        // setDeviceList(result);
        // console.log("FINAL RESULT: ", result);
    }



    const events = {
        select: function (event) {
            var { nodes, edges } = event;
        },
        doubleClick: ({ nodes, edges }) => {
            console.log("Selected Node double clicked: " + nodes);
        },
        click: ({ nodes, edges }) => {
            console.log(typeof (nodes) + " " + typeof (edges));
            if (isEmpty(nodes)) {
                console.log("helu");
                setSelectedNode("No node selected");
            }
            else {
                console.log("what")
                setSelectedNode(nodes);
            }
            handleNodeClick(nodes)
            // selectedNode = nodes;

        }
    };

    return (
        <>
            <ComplexNavbar />

            <div className="flex flex-col lg:flex-row">
                <div className="lg:w-2/3 overflow-hidden h-[89vh]">
                    <Graph
                        graph={ { nodes: modifiedGraphData, edges: graphData.edges } }
                        options={ options }
                        // events={ events }
                        events={ events }
                    />
                </div>
                <div className="lg:w-1/3 bg-[#d8dbdd]">
                    {
                        deviceList.length > 0 && selectedNode !== "No node selected" ?
                            <div className="m-4">
                                <DeviceDetailsTable data={ deviceList } location={ selectedLocation } />
                            </div>
                            :
                            <div className="flex items-center justify-center h-full">
                                No Devices!
                            </div>

                    }
                </div>
            </div>
        </>
    );
}

export default NetworkMap;