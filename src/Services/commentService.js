import axios from 'axios'

export function createCommentApi(commentContent, postId) {
    return axios.post('https://linked-posts.routemisr.com/comments', {
        post: postId,
        content: commentContent
    }, {
        headers: {
            token: localStorage.getItem('token')
        }
    })


}

export async function deleteCommentApi(commentId) {
    try {
        const { data } = await axios.delete('https://linked-posts.routemisr.com/comments/' + commentId, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        return data
    } catch (error) {
        return error.response.data
    }
}

export async function updateCommentApi(commentContent, commentId) {
    try {
        const { data } = await axios.put('https://linked-posts.routemisr.com/comments/' + commentId, {
            content: commentContent
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        return data
    } catch (error) {
        return error.response.data
    }
}

export async function getPostCommentsApi(postId) {
    try {
        const { data } = await axios.get('https://linked-posts.routemisr.com/posts/' + postId + '/comments', {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        return data
    } catch (error) {
        return error.response.data
    }
}
