import ComplexNavbar from "../components/ComplexNavbar";
import SortableTable from "../components/SortableTable";


const Switch = () => {
    document.title = "Switch | Network Monitoring";
    return (
        <>
            <ComplexNavbar />

            <div className="main-table mx-14 my-10">
                <SortableTable filter={ 'Switch' } />
            </div>
        </>
    );
}

export default Switch;