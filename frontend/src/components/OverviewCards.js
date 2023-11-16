import { DeviceContext } from '../contexts/DeviceContext';
import { useContext, useEffect, useState } from 'react';
import {
    Card,
    Typography,
} from "@material-tailwind/react";

const OverviewCards = () => {
    const { devices: data } = useContext(DeviceContext);
    const [upCount, setUpCount] = useState(0);
    const [downCount, setDownCount] = useState(0);
    const [unknownCount, setUnknownCount] = useState(0);
    const [cards, setCards] = useState([]);

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
                },
                {
                    title: 'APs',
                    count: data.filter(device => device.type === 'Access Point').length,
                    icon: './ap.png',
                },
                {
                    title: 'Domains',
                    count: data.filter(device => device.type === 'Domain').length,
                    icon: './globe.png',
                },
                {
                    title: 'Other',
                    count: data.filter(device => !['Switch', 'Access Point', 'Domain'].includes(device.type)).length,
                    icon: './computer.png',
                },
            ]);
        }
    }, [data]);

    return (
        <div className="mx-14 bg-white rounded-lg shadow-lg p-10 mb-6">
            <div class="mx-auto grid">
                <h2 class="text-2xl font-bold text-gray-800 pb-6 text-center">
                    Dashboard
                </h2>

                <div class="grid gap-6 mb-2 md:grid-cols-2 l:grid-cols-3 xl:grid-cols-5">

                    { cards.map((card, index) => {
                        return (
                            <Card color="gray" variant="gradient" className="w-full l:max-w-[22rem] xl:max-w-[19rem] p-8" key={ card.title }>
                                <div className="flex gap-8 items-center">
                                    <div class="rounded-full">
                                        <img src={ process.env.PUBLIC_URL + card.icon } alt="" />
                                    </div>
                                    <div>
                                        <Typography
                                            variant="h1"
                                            color="white"
                                            className="flex justify-center gap-1 text-2xl font-normal"
                                        > { card.title } </Typography>
                                        <p class="text-xl font-semibold text-gray-400">
                                            { card.count }
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        )
                    }) }

                    { downCount === 0 &&
                        <Card variant="gradient" className="w-full l:max-w-[22rem] xl:max-w-[19rem] bg-green-300 h-[8rem]">
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
                        <Card variant="gradient" className="w-full l:max-w-[22rem] xl:max-w-[19rem] animate-pulse bg-red-300 h-[8rem]">
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