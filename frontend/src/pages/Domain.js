import ComplexNavbar from "../components/ComplexNavbar";
import SortableTable from "../components/SortableTable";
import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext";


const AP = () => {
    document.title = "Domains | Network Monitoring";
    const navigate = useNavigate();
    const { isLoggedin } = useContext(AuthContext);

    useEffect(() => {
        if (!isLoggedin) {
            navigate('/login');
        }
    }, [isLoggedin, navigate]);

    return (
        <>
            { !isLoggedin && navigate('/login') }
            { isLoggedin &&
                <>
                    <ComplexNavbar />
                    <div className="main-table mx-14 my-10">
                        <SortableTable filter={ 'Domain' } />
                    </div>
                </>
            }
        </>
    );
}

export default AP;