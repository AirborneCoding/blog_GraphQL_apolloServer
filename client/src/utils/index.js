import axios from "axios"
import moment from "moment";
moment.locale('fr')
import { logout } from "../redux/slices/authSlice";

// logout user
export function logoutUser() {
    return async (dispatch) => {
        dispatch(logout());
    };
}

export const developmentUrl = "http://localhost:5000"

export const developmentUrlGraphql =  "http://localhost:5000/graphql"
export const developmentUrlRestFull = "http://localhost:5000/api/v1"

// export const developmentUrlGraphql =  import.meta.env.VITE_ORIGINEGraph
// export const developmentUrlRestFull = import.meta.env.VITE_ORIGINERest


export const customFetch = (endpoint) => {
    return axios.create({
        baseURL: `${developmentUrl}${endpoint}`,
    });
};
export const customFetch2 = axios.create({
    baseURL: developmentUrlRestFull,
});


export const formatDate = (date) => {
    const dateObject = moment.unix(date / 1000);
    const formattedDate = dateObject.format('LL');

    return formattedDate;
}