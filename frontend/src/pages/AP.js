import ComplexNavbar from "../components/ComplexNavbar";
import SortableTable from "../components/SortableTable";


const AP = () => {
    document.title = "Access Points | Network Monitoring";
    return (
        <>
            <ComplexNavbar />

            <div className="main-table mx-14 my-10">
                <SortableTable filter={ 'Access Point' } />
            </div>
        </>
    );
}

export default AP;