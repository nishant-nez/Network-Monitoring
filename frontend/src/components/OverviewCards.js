import { DeviceContext } from '../contexts/DeviceContext';
import { useContext, useEffect, useState } from 'react';
import {
    Card,
    Typography,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

const OverviewCards = () => {
    const { devices: data } = useContext(DeviceContext);
    const [upCount, setUpCount] = useState(0);
    const [downCount, setDownCount] = useState(0);
    const [unknownCount, setUnknownCount] = useState(0);
    const [cards, setCards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (data && Array.isArray(data)) {
            setUpCount(data.filter((item) => item.status === 'up').length);
            setDownCount(data.filter((item) => item.status === 'down').length);
            setUnknownCount(data.filter((item) => item.status === 'unknown').length);

            setCards([
                {
                    title: 'Switches',
                    count: data.filter(device => device.type === 'Switch').length,
                    icon: './switch.png',
                    to: '/switch',
                },
                {
                    title: 'APs',
                    count: data.filter(device => device.type === 'Access Point').length,
                    icon: './ap.png',
                    to: '/ap',
                },
                {
                    title: 'Domains',
                    count: data.filter(device => device.type === 'Domain').length,
                    icon: './globe.png',
                    to: '/domain',
                },
                {
                    title: 'Other',
                    count: data.filter(device => !['Switch', 'Access Point', 'Domain'].includes(device.type)).length,
                    icon: './computer.png',
                    to: '/other',
                },
            ]);
        }
    }, [data]);

    return (
        <div className="mx-14 bg-white rounded-lg shadow-lg p-10 mb-6">
            <div className="mx-auto grid">
                <h2 className="text-2xl font-bold text-gray-800 pb-6 text-center">
                    Overview
                </h2>

                <div className="grid gap-6 mb-2 md:grid-cols-2 l:grid-cols-3 xl:grid-cols-5">

                    { cards.map((card, index) => {
                        return (
                            <Card color="gray" variant="gradient" className="w-full l:max-w-[22rem] xl:max-w-[19rem] p-8 cursor-pointer"
                                key={ card.title }
                                onClick={ () => { navigate(card.to) } }>
                                <div className="flex gap-8 items-center">
                                    <div className="rounded-full">
                                        <img src={ process.env.PUBLIC_URL + card.icon } alt="" />
                                    </div>
                                    <div>
                                        <Typography
                                            variant="h1"
                                            color="white"
                                            className="flex justify-center gap-1 text-2xl font-normal"
                                        > { card.title } </Typography>
                                        <p className="text-xl font-semibold text-gray-400">
                                            { card.count }
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        )
                    }) }

                    { downCount === 0 &&
                        <Card variant="gradient" className="w-full l:max-w-[22rem] xl:max-w-[19rem] bg-green-300 h-[8rem] cursor-pointer">
                            <div className="flex items-center justify-center text-center h-full">
                                <Typography
                                    variant="h1"
                                    color="white"
                                    className="flex justify-center gap-1 text-xl font-normal"
                                >
                                    All devices up!
                                </Typography>
                            </div>
                        </Card>
                    }
                    { downCount > 0 &&
                        <Card variant="gradient" className="w-full l:max-w-[22rem] xl:max-w-[19rem] animate-pulse bg-red-300 h-[8rem] cursor-pointer">
                            <div className="flex items-center justify-center text-center h-full">
                                <Typography
                                    variant="h1"
                                    color="white"
                                    className="flex justify-center gap-1 text-xl font-normal"
                                >
                                    { downCount } Device(s) down!
                                </Typography>
                            </div>
                        </Card>
                    }
                </div>
            </div>
        </div>
    );
}

export default OverviewCards;