import {
    Typography,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";

const Overview = (props) => {
    const [data, setData] = useState([props.data]);
    const [upCount, setUpCount] = useState((props.data.filter((item) => item.status === 'up')).length);
    const [downCount, setDownCount] = useState((props.data.filter((item) => item.status !== 'up')).length);
    console.log('this is my props:')
    console.log(data);
    console.log('this is up devices count: ');
    console.log(upCount)

    useEffect(() => {
        setData(props.data);
        setUpCount((props.data.filter((item) => item.status === 'up')).length);
        setDownCount((props.data.filter((item) => item.status !== 'up')).length);
    }, [props.data]);


    const cards = [
        {
            title: 'Switches',
            count: props.data.filter(device => device.type === 'Switch').length,
            icon: './switch.png',
        },
        {
            title: 'APs',
            count: props.data.filter(device => device.type === 'Access Point').length,
            icon: './ap.png',
        },
        {
            title: 'Domains',
            count: props.data.filter(device => device.type === 'Domain').length,
            icon: './globe.png',
        },
        {
            title: 'Other',
            count: props.data.filter(device => device.type !== 'Switch' && device.type !== 'Access Point' && device.type !== 'Domain').length,
            icon: './computer.png',
        }
    ];



    return (
        <div className="overview mx-14 bg-white rounded-lg shadow-lg p-10">
            <Typography as={ 'div' }>
                <div className="text-2xl font-bold text-gray-800 pb-6 text-center">Overview</div>
            </Typography>
            <div className="flex min-w-full flex-wrap justify-evenly gap-6">
                { cards.map((card, index) => {
                    return (
                        <div className="count-card flex gap-6 items-center bg-[#49596a] rounded-lg p-4 w-[230px]" key={ index }>
                            <img src={ process.env.PUBLIC_URL + card.icon } alt="" />
                            <div className="count-content text-center">
                                <h1 className="font-bold text-white text-xl">{ card.title }</h1>
                                <div className='text-gray-100 text-xl'>
                                    { card.count }
                                </div>
                            </div>
                        </div>
                    )
                }) }
                <div className="flex items-center justify-between gap-10 bg-gray-100 pr-10 pl-6 rounded-xl ">
                    { upCount === 0 &&
                        <>
                            <div>
                                <img className="animate-pulse w-[120px]" src={ process.env.PUBLIC_URL + '/green.png' } alt="status" />
                            </div>
                            <div>
                                <div className="font-bold text-green-800">All Devices Running Smoothly!</div>
                            </div>
                        </>
                    }
                    { downCount > 0 &&
                        <>
                            <div>
                                <img className="animate-pulse w-[120px] py-2" src={ process.env.PUBLIC_URL + '/red.png' } alt="status" />
                            </div>
                            <div>
                                <div className="font-bold text-red-800">{ downCount } Device(s) are Down!</div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default Overview;
