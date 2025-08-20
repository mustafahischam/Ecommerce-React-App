

import axios from "axios";

export async function sendRegisterRequest(userData) {
    try {
        let { data } = await axios.post('https://linked-posts.routemisr.com/users/signup', userData);
        return data
    } catch (err) {
        return err?.response?.data
    }
}

export async function sendLoginData(userData) {
    try {
        let { data } = await axios.post('https://linked-posts.routemisr.com/users/signin', userData);
        return data
    } catch (err) {
        return err?.response?.data
    }
}

export async function getUserDataApi() {
    try {
        let { data } = await axios.get('https://linked-posts.routemisr.com/users/profile-data', {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        return data
    } catch (err) {
        return err?.response?.data
    }
}

export async function updateUserPhotoApi(formData) {
    try {
        const { data } = await axios.put('https://linked-posts.routemisr.com/users/upload-photo', formData, {
            headers: {
                token: localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data'
            }
        })
        return data
    } catch (err) {
        return err?.response?.data
    }
}

export async function changePasswordApi({ currentPassword, newPassword }) {
    try {
        const { data } = await axios.patch('https://linked-posts.routemisr.com/users/change-password', {
            password: currentPassword,
            newPassword
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        return data
    } catch (err) {
        return err?.response?.data
    }
}