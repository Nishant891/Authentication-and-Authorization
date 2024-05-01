import axios, { AxiosResponse } from 'axios'

export const checkCookies = async() => {
    try {
        const response : AxiosResponse = await axios.get("http://localhost:8000/checkCookies", {withCredentials : true});
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}