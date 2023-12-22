import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://drag-drop-server.vercel.app',
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;