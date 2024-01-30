import toast from 'react-hot-toast';


export const getFormValues = (form) => {
    const formData = new FormData(form)
    const values = [...formData.values()]
    const isEmpthy = values.includes("")
    const data = Object.fromEntries(formData)
    return { isEmpthy, data };
};



export function displayToast(message, type, place) {
    const toastConfig = {
        position: place || "top-center",
        reverseOrder: false
    };
    switch (type) {
        case "success":
            toast.success(message, toastConfig);
            break;
        case "warn":
            toast.warn(message);
            break;
        case "error":
            toast.error(message);
            break;
        default:
            toast.info(message);
            break;
    }
}

