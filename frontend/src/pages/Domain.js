import ComplexNavbar from "../components/ComplexNavbar";
import SortableTable from "../components/SortableTable";


const Domain = () => {
    document.title = "Domain | Network Monitoring";
    return (
        <>
            <ComplexNavbar />

            <div className="main-table mx-14 my-10">
                <SortableTable filter={ 'Domain' } />
            </div>
        </>
    );
}

export default Domain;