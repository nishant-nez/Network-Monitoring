import { ToastContainer, toast } from 'react-toastify';

const Toast = (type, message) => {
    if (type === 'success') {
        return (
            toast.success(message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        );
    } else if (type === 'error') {
        return (
            toast.error(`Error: ${ message }`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        )
    }
}


const ToastBox = () => {
    return (
        <ToastContainer className="z-50"
            position="bottom-right"
            autoClose={ 5000 }
            hideProgressBar={ false }
            newestOnTop={ false }
            closeOnClick
            rtl={ false }
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    );
}

export { Toast, ToastBox };