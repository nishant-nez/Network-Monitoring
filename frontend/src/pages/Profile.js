import ComplexNavbar from "../components/ComplexNavbar";
import { Toast, ToastBox } from "../components/Toast";
import { backend } from '../constants';
import { AuthContext } from "../contexts/AuthContext";
import { EmailContext } from "../contexts/EmailContext";
import { redirect, useNavigate } from 'react-router-dom';
import {
    Typography,
    List,
    ListItem,
    ListItemSuffix,
    Card,
    IconButton,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Spinner,
} from "@material-tailwind/react";
import { useState, useEffect, useContext } from "react";

import useFetch from "../hooks/useFetch";



function TrashIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
        >
            <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                clipRule="evenodd"
            />
        </svg>
    );
}


const Profile = () => {
    document.title = "Profile | Network Monitoring";
    const { data: userData, isPending: useIsPending, error: useError } = useFetch('/api/users/current');
    // let { data: emailData, isPending: emailIsPending, error: emailError } = useFetch('/api/recipients');
    const { emailList, updateEmail, isPending: emailIsPending, error: emailError } = useContext(EmailContext);

    const navigate = useNavigate();

    const [addPending, setAddPending] = useState(false);
    const [isClicked, setIsClicked] = useState(true);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const { toggleLogin, isLoggedin, toggleLogout } = useContext(AuthContext);

    const handleOpen = () => setOpen(!open);

    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem('user');
        return storedToken ? JSON.parse(storedToken) : null;
    });

    useEffect(() => {
        if (!isLoggedin) {
            redirect('/login');
        }
    }, [isLoggedin]);

    const handleDelete = (id) => {
        console.log(id);
        fetch(backend + '/api/recipients/' + id, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${ token }`,
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (res.status === 401) {
                toggleLogout();
            } else if (!res.ok) {
                throw Error('Could not delete email');
            }
            return res.json();
        }).then((data) => {
            Toast('success', 'Email Deleted!');
            updateEmail();
            setIsClicked(!isClicked);
        }).catch(err => {
            Toast('error', err);
        });
    }

    const handleAdd = (e) => {
        e.preventDefault();
        setAddPending(true);
        const recipient = { email, description };
        if (email) {
            fetch(backend + '/api/recipients/', {
                method: 'POST',
                body: JSON.stringify(recipient),
                headers: {
                    Authorization: `Bearer ${ token }`,
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                if (res.status === 401) {
                    handleOpen();
                    toggleLogout();
                } else if (!res.ok) {
                    handleOpen();
                    throw Error('Could not fetch the data for that resource');
                }
                setAddPending(false);
                return res.json();
            }).then((data) => {
                handleOpen();
                Toast('success', 'Email Added!');
                setIsClicked(!isClicked);
                setEmail('');
                setDescription('');
                updateEmail();
                setAddPending(false);
            }).catch(err => {
                handleOpen();
                Toast('error', err);
                setEmail('');
                setDescription('');
                setAddPending(false);
            });
        }
    }

    return (
        <>
            { !isLoggedin && navigate('/login') }
            <ComplexNavbar />
            { useIsPending && emailIsPending && <Spinner /> }
            { userData && emailList &&
                <>
                    <div className="container mx-auto my-32">
                        <div>
                            { console.log('emaillist: ') }
                            { console.log(emailList) }
                            <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">
                                <div className="flex justify-center">
                                    <img src={ process.env.PUBLIC_URL + '/deerwalk-logo.png' } alt="" className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110" />
                                </div>

                                <div className="mt-16">
                                    <h1 className="font-bold text-center text-3xl text-gray-900">{ userData.username }</h1>
                                    {/* <p className="text-center text-sm text-gray-400 font-medium">UI Components Factory</p> */ }
                                    <div className="my-5 px-6">
                                        <a href="/profile" className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white">
                                            Button?
                                        </a>
                                    </div>
                                    <div className="flex justify-between items-center my-5 px-6">
                                    </div>
                                    <hr className="my-6 mx-4" />
                                    <div className="w-full">
                                        <div className="flex items-center justify-between px-6">
                                            <h3 className="font-semibold text-lg text-gray-900 text-left">Email Recipients</h3>
                                            <Button onClick={ handleOpen }>Add Recipient</Button>
                                        </div>
                                        <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-base">
                                            { Array.isArray(emailList) && emailList.map(obj => {
                                                return (
                                                    <div
                                                        className="flex justify-between items-center w-full border border-gray-100 text-gray-600 py-4 pl-6 pr-3 hover:bg-gray-100 transition duration-150 overflow-hidden"
                                                        key={ obj._id }>
                                                        <div>
                                                            { obj.email }
                                                        </div>
                                                        <div onClick={ () => handleDelete(obj._id) } className="cursor-pointer mx-4">
                                                            <TrashIcon />
                                                        </div>
                                                    </div>
                                                )
                                            }) }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* FORM */ }
                    <Dialog open={ open } handler={ handleOpen }>
                        <DialogHeader>Add a New Recipient!</DialogHeader>
                        <DialogBody>
                            <form className="bg-white px-8 pt-6 pb-8 mb-4" onSubmit={ handleAdd }>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Email <span className="text-red-400">*</span>
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        required
                                        value={ email }
                                        onChange={ (e) => setEmail(e.target.value) }
                                        placeholder="example@email.com" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Description
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="description"
                                        type="text"
                                        value={ description }
                                        onChange={ (e) => setDescription(e.target.value) }
                                        placeholder="Description" />
                                </div>

                                <div className="flex items-center justify-center mx-4">
                                    {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Add Device
                            </button> */}
                                    { !addPending && <Button className="flex items-center gap-6 px-6 py-3 mt-4 text-sm" size="sm" type='submit'>
                                        Add Recipient
                                    </Button> }
                                    { addPending && <Button className="flex items-center gap-6 px-6 py-3 mt-4 text-sm" disabled size="sm" type='submit'>
                                        Add Recipient
                                    </Button> }
                                </div>
                            </form>
                        </DialogBody>
                        <DialogFooter>
                            <Button
                                variant="text"
                                color="red"
                                onClick={ handleOpen }
                                className="mr-1"
                            >
                                <span>Cancel</span>
                            </Button>
                        </DialogFooter>
                    </Dialog>
                </>


            }
            <ToastBox />
        </>
    );
}

export default Profile;