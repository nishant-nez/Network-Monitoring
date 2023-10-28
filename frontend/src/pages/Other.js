import ComplexNavbar from "../components/ComplexNavbar";
import SortableTable from "../components/SortableTable";


const Other = () => {
    document.title = "Other Devices | Network Monitoring";
    return (
        <>
            <ComplexNavbar />

            <div className="main-table mx-14 my-10">
                <SortableTable filter={ 'Others' } />
            </div>
        </>
    );
}

export default Other;