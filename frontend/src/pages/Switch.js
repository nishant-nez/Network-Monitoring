import ComplexNavbar from "../components/ComplexNavbar";
import SortableTable from "../components/SortableTable";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext";


const AP = () => {
    document.title = "Access Points | Network Monitoring";
    const navigate = useNavigate();
    const { isLoggedin } = useContext(AuthContext);
    return (
        <>
            { !isLoggedin && navigate('/login') }
            { isLoggedin &&
                <>
                    <ComplexNavbar />
                    <div className="main-table mx-14 my-10">
                        <SortableTable filter={ 'Switch' } />
                    </div>
                </>
            }
        </>
    );
}

export default AP;