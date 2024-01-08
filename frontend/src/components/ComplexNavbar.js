import React from "react";
import { Link } from 'react-router-dom';
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    IconButton,
} from "@material-tailwind/react";
import {
    HomeIcon,
    UserCircleIcon,
    ChevronDownIcon,
    PowerIcon,
    Bars2Icon,
    WifiIcon,
    ServerIcon,
    ComputerDesktopIcon,
    GlobeAltIcon,
    MapIcon,
} from "@heroicons/react/24/solid";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { uuidv7 as uuidv4 } from 'uuidv7';
import { useNavigate } from "react-router-dom";

// profile menu component
const profileMenuItems = [
    {
        label: "Profile",
        icon: UserCircleIcon,
    },
    // {
    //     label: "Edit Profile",
    //     icon: Cog6ToothIcon,
    // },
    {
        label: "Sign Out",
        icon: PowerIcon,
    },
];

function ProfileMenu() {
    const { toggleLogout } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const navigate = useNavigate();

    return (
        <Menu open={ isMenuOpen } handler={ setIsMenuOpen } placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt="tania andrew"
                        className="border border-gray-900 p-0.5"
                        src={ process.env.PUBLIC_URL + '/deerwalk-logo.png' }
                    />
                    <ChevronDownIcon
                        strokeWidth={ 2.5 }
                        className={ `h-3 w-3 transition-transform ${ isMenuOpen ? "rotate-180" : ""
                            }` }
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                { profileMenuItems.map(({ label, icon, onClick }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={ label }
                            onClick={ () => {
                                setIsMenuOpen(false);
                                if (label === "Sign Out") {
                                    console.log("----------------------toggleLogout() called by NAVBAR LINE 85");
                                    toggleLogout();
                                } else if (label === "Profile") {
                                    navigate('/profile');
                                }
                            } }
                            className={ `flex items-center gap-2 rounded ${ isLastItem
                                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                : ""
                                }` }
                        >
                            { React.createElement(icon, {
                                className: `h-4 w-4 ${ isLastItem ? "text-red-500" : "" }`,
                                strokeWidth: 2,
                            }) }
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={ isLastItem ? "red" : "inherit" }
                            >
                                { label }
                            </Typography>
                        </MenuItem>
                    );
                }) }

            </MenuList>
        </Menu>
    );
}

// nav list component
const navListItems = [
    {
        label: "Home",
        icon: HomeIcon,
        goto: '/',
    },
    {
        label: "Switch",
        icon: ServerIcon,
        goto: '/switch',
    },
    {
        label: "AP",
        icon: WifiIcon,
        goto: '/ap',
    },
    {
        label: "Domain",
        icon: GlobeAltIcon,
        goto: '/domain',
    },
    {
        label: "Other",
        icon: ComputerDesktopIcon,
        goto: '/other',
    },
    {
        label: "Map",
        icon: MapIcon,
        goto: '/map',
    },
];

function NavList() {
    return (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
            {/* <NavListMenu /> */ }
            { navListItems.map(({ label, icon, goto }) => (
                <Link to={ goto } key={ uuidv4() }>
                    <Typography
                        as="p"
                        variant="h6"
                        color="blue-gray"
                        className="font-medium"
                    >
                        <MenuItem className="flex items-center gap-2 lg:rounded-full">
                            { React.createElement(icon, { className: "h-[20px] w-[20px]" }) }{ " " }
                            <span className="text-gray-900"> { label }</span>
                        </MenuItem>
                    </Typography>
                </Link>
            )) }
        </ul>
    );
}

export default function ComplexNavbar() {
    const [isNavOpen, setIsNavOpen] = React.useState(false);

    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setIsNavOpen(false),
        );
    }, []);

    return (
        <Navbar className="mx-auto min-w-[100%] p-5 lg:rounded-lg  lg:pl-6">
            <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="/"
                    variant="h5"
                    className="mr-4 cursor-pointer py-1.5 lg:ml-2"
                >
                    Network Monitor
                </Typography>
                <div className="hidden lg:block ml-auto">
                    <NavList />
                </div>
                <IconButton
                    size="sm"
                    color="blue-gray"
                    variant="text"
                    onClick={ toggleIsNavOpen }
                    className="ml-auto mr-2 lg:hidden"
                >
                    <Bars2Icon className="h-6 w-6" />
                </IconButton>
                <ProfileMenu />
            </div>
            <Collapse open={ isNavOpen } className="overflow-scroll">
                <NavList />
            </Collapse>
        </Navbar>
    );
}