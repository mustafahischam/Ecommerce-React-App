import axios from "axios";

export async function getAllPostsApi() {
    try {
        const { data } = await axios.get('https://linked-posts.routemisr.com/posts', {
            headers: {
                token: localStorage.getItem('token')
            },
            params: {
                limit: 15,
                sort: '-createdAt'
            }
        })
        return data
    } catch (error) {
        return error.response.data
    }
}

export async function getSinglePostApi(postId) {
    try {
        const { data } = await axios.get('https://linked-posts.routemisr.com/posts/' + postId, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        return data
    } catch (error) {
        return error.response.data
    }
}

export async function createPostApi(formData) {
    try {
        const { data } = await axios.post('https://linked-posts.routemisr.com/posts', formData, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        return data
    } catch (error) {
        return error.response.data
    }
}

export async function updatePostApi(formData, postId) {
    try {
        const { data } = await axios.put('https://linked-posts.routemisr.com/posts/' + postId, formData, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        return data
    } catch (error) {
        return error.response.data
    }
}

export async function deletePostApi(postId) {
    try {
        const { data } = await axios.delete('https://linked-posts.routemisr.com/posts/' + postId, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        return data
    } catch (error) {
        return error.response.data
    }
}

export async function getUserPostsApi(userId, options = {}) {
    try {
        const params = { limit: options.limit ?? 15 }
        if (options.page) params.page = options.page
        const { data } = await axios.get('https://linked-posts.routemisr.com/users/' + userId + '/posts', {
            headers: {
                token: localStorage.getItem('token')
            },
            params
        })
        return data
    } catch (error) {
        return error.response?.data
    }
}