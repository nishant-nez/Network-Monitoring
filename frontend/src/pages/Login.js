import { useState, useEffect } from "react";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast, ToastBox } from "../components/Toast";
import { AuthContext } from "../contexts/AuthContext";
import { backend } from '../constants';
import BackgroundParticles from "../components/BackgroundParticles";
import Footer from "../components/Footer";

const Login = () => {
    document.title = "Login | Network Monitoring";
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);
    const { toggleLogin, isLoggedin, toggleLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = { username, password };

        // POST Request here
        try {
            const response = await fetch(backend + '/api/users/login',
                {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            );
            if (response.ok) {
                const json = await response.json();
                console.log('Login Successful, ', json.accessToken);
                localStorage.setItem('user', JSON.stringify(json.accessToken));
                setToken(json.accessToken);
                toggleLogin();
                navigate("/");
            } else {
                const errMessage = await response.json();
                console.log(errMessage)
                Toast('error', errMessage.message);
                toggleLogout();
            }
        } catch (err) {
            console.log('Error: ', err);
            Toast('error', err);
            toggleLogout();
        }
    };

    useEffect(() => {
        if (isLoggedin) {
            navigate("/");
        }
    }, [isLoggedin, navigate]);


    return (
        <div className="main-content">
            { isLoggedin && navigate("/") }
            {/* <TestPage /> */ }
            <BackgroundParticles />
            <div className="min-w-full min-h-[100vh] flex justify-center items-center bg-gray-200">
                <div className="login-box rounded-lg bg-gray-100 shadow-lg hover:shadow-xl z-50">
                    <div className="login-items w-full">
                        <div className="relative w-[670px] h-[179px] rounded-tl-lg rounded-tr-lg bg-[url('https://img.freepik.com/premium-photo/abstract-technological-dark-background_763713-3931.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699747200&semt=ais')]">
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-30 rounded-tl-lg rounded-tr-lg">
                                <span className="text-white text-3xl font-bold text-center">SIGN IN <br />Network Monitor</span>
                            </div>
                        </div>
                        {/* begin */ }
                        <div className="mt-10 mb-14 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                            <div className="mt-12">
                                <form onSubmit={ handleSubmit }>
                                    <div>
                                        <div className="text-sm font-bold text-gray-700 tracking-wide">Username</div>
                                        <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 bg-gray-100"
                                            type="text"
                                            value={ username }
                                            onChange={ (e) => setUsername(e.target.value) }
                                            placeholder="Enter your username" />
                                    </div>
                                    <div className="pt-9">
                                        <div className="text-sm font-bold text-gray-700 tracking-wide">Password</div>
                                        <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 bg-gray-100"
                                            type="password"
                                            value={ password }
                                            onChange={ (e) => setPassword(e.target.value) }
                                            placeholder="Enter your password" />
                                    </div>
                                    <div className="mt-10 flex items-center justify-center">
                                        <button className="bg-indigo-500 text-gray-100 p-4 w-[60%] rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                    shadow-lg text-xl">
                                            Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* end */ }
                    </div>
                </div>
            </div>
            <Footer />
            <ToastBox />
        </div>
    );
};


export default Login;