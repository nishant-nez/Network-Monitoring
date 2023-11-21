import ComplexNavbar from "../components/ComplexNavbar";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    document.title = "404 | Network Monitoring";
    const navigate = useNavigate();
    const { isLoggedin } = useContext(AuthContext);
    return (
        <>
            { !isLoggedin && navigate('/login') }
            { isLoggedin &&
                <>
                    <ComplexNavbar />
                    <div className="h-screen flex flex-col items-center justify-center overflow-hidden mt-[-87px]">
                        <div className="flex flex-col items-center">
                            <h1 className="text-[120px] font-extrabold text-gray-700 mt-[-20px]">404</h1>
                            <p className="text-2xl font-medium text-gray-600 mb-6 mt-4">Page Not Found</p>
                            <Link to="/" className="px-4 py-2 font-medium text-white bg-[#212121] rounded-md hover-bg-gray-800 transition-all duration-200 ease-in-out">
                                Go Home
                            </Link>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default NotFound;