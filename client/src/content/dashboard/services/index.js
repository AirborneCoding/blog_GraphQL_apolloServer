import axios from 'axios';
import { customFetch, developmentUrlGraphql, developmentUrl } from "../../../utils"

const getUserToken = () => {
    const user = JSON.parse(localStorage.getItem('01-BLOG_USER')) || null;
    return user?.token || '';
};

const token = getUserToken();

export const uploadProfilePhoto = async (file) => {
    try {
        const response = await axios.put(`${developmentUrl}/users/profilePhoto`, file, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error uploading profile photo:', error);
    }
};