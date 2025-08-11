

import axios from "axios";

export async function sendRegisterRequest(userData) {
    try {
        let { data } = await axios.post('/api/users/signup', userData);

        console.log(data);
        return data
    } catch (err) {
        console.log(err);
        const fallback = { error: err?.message };
        return err?.response?.data || fallback
    }
}

export async function sendLoginData(userData) {
    try {
        let { data } = await axios.post('/api/users/signin', userData);

        // console.log(data);
        return data
    } catch (err) {
        console.log(err);
        const fallback = { error: err?.message };
        return err?.response?.data || fallback
    }
}