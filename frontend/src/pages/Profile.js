import ComplexNavbar from "../components/ComplexNavbar";
import {
    Typography,
    List,
    ListItem,
    ListItemSuffix,
    Card,
    IconButton,
    Button,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";

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
    const { data: userData, isPending: useIsPending, error: useError } = useFetch('/api/users/current');
    const { data: emailData, isPending: emailIsPending, error: emailError } = useFetch('/api/recipients');

    return (
        <>
            <ComplexNavbar />
            <div>
                <div class="p-16 pt-6">
                    <div class="p-8 bg-white shadow mt-24 rounded-lg">
                        <div class="grid grid-cols-1 md:grid-cols-3">
                            <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                                <div>
                                    <p class="font-bold text-gray-700 text-xl">22</p>
                                    <p class="text-gray-400">Friends</p>
                                </div>
                                <div>
                                    <p class="font-bold text-gray-700 text-xl">10</p>
                                    <p class="text-gray-400">Photos</p>
                                </div>
                                <div>
                                    <p class="font-bold text-gray-700 text-xl">89</p>
                                    <p class="text-gray-400">Comments</p>
                                </div>
                            </div>
                            <div class="relative">
                                <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                    </svg> */}
                                    <img src={ process.env.PUBLIC_URL + '/deerwalk-logo.png' } alt="profile logo" className="w-48 h-48 rounded-full" />
                                </div>
                            </div>

                            <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                                <button
                                    class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                                >
                                    Connect
                                </button>
                                <button
                                    class="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                                >
                                    Message
                                </button>
                            </div>
                        </div>

                        <div class="mt-20 text-center border-b pb-12">
                            <h1 class="text-4xl font-medium text-gray-700">Jessica Jones, <span class="font-light text-gray-500">27</span></h1>
                            <p class="font-light text-gray-600 mt-3">Bucharest, Romania</p>

                            <p class="mt-8 text-gray-500">Solution Manager - Creative Tim Officer</p>
                            <p class="mt-2 text-gray-500">University of Computer Science</p>
                        </div>

                        <div class="mt-12 flex flex-col justify-center">
                            <Typography variant="h5">
                                Email Recipients
                            </Typography>


                            <Card className="w-96">
                                <List>
                                    <ListItem ripple={ true } className="py-1 pr-1 pl-4">
                                        Item One
                                        <ListItemSuffix>
                                            <IconButton variant="text" color="blue-gray">
                                                <TrashIcon />
                                            </IconButton>
                                        </ListItemSuffix>
                                    </ListItem>
                                    <ListItem ripple={ true } className="py-1 pr-1 pl-4">
                                        Item Two
                                        <ListItemSuffix>
                                            <IconButton variant="text" color="blue-gray">
                                                <TrashIcon />
                                            </IconButton>
                                        </ListItemSuffix>
                                    </ListItem>
                                    <ListItem ripple={ true } className="py-1 pr-1 pl-4">
                                        Item Three
                                        <ListItemSuffix>
                                            <IconButton variant="text" color="blue-gray">
                                                <TrashIcon />
                                            </IconButton>
                                        </ListItemSuffix>
                                    </ListItem>
                                    <ListItem ripple={ false } className="py-2 pr-1 pl-4">
                                        <ListItemSuffix>
                                            <Button className="w-36 ml-[-130px] py-4">Add Recipient</Button>
                                        </ListItemSuffix>
                                    </ListItem>
                                </List>
                            </Card>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;