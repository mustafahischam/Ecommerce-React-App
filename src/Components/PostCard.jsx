import React from 'react'
import PostHeader from './Card/PostHeader'
import PostBody from './Card/PostBody'
import PostFooter from './Card/PostFooter'
import Comment from './Comment'
import { Link } from 'react-router-dom'
import { Input } from '@heroui/react'
import { Button } from '@heroui/react'
import { useState, useEffect } from 'react'
import { createCommentApi } from '../Services/commentService'
import LoadingScreen from './LoadingScreen'
import { AuthContext } from '../Context/AuthContext.jsx'
import { useContext } from 'react'
import DropDownAction from './DropDownAction'
import { getPostCommentsApi } from '../Services/commentService'
import CreatePost from '../Components/CreatePost'


// import { useForm } from 'react-hook-form'
// import { useForm } from 'react-hook-form'
export default function PostCard({ post, commentLimit, callBack }) {
    const [commentContent, setCommentContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [comments, setComments] = useState(post.comments)
    const { userData } = useContext(AuthContext)
    const [isUpdating, setIsUpdating] = useState(false)

    // Sync local comments state with post prop
    useEffect(() => {
        const sorted = Array.isArray(post.comments)
            ? post.comments.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            : [];
        setComments(sorted)
    }, [post.comments])

    async function getPostComments() {
        const response = await getPostCommentsApi(post.id)
        if (response.message) {
            const sorted = Array.isArray(response.comments)
                ? response.comments.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                : [];
            setComments(sorted)
        }
    }

    async function createComment(e) {
        e.preventDefault();
        setLoading(true)
        const response = await createCommentApi(commentContent, post.id)
        if (response.message) {
            setCommentContent('')
            await getPostComments()
        }
        setLoading(false)
    }
    return <>
        {isUpdating ?
            <CreatePost post={post} callBack={callBack} isUpdating={isUpdating} setIsUpdating={setIsUpdating} /> :
            <div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5 overflow-hidden">
                <div className="w-full h-16 flex items-center justify-between ">
                    <PostHeader
                        photo={post.user.photo}
                        name={post.user.name}
                        date={post.createdAt} />
                    {userData?._id === post.user._id && <>
                        <DropDownAction postId={post.id} callBack={callBack} setIsUpdating={setIsUpdating} />
                    </>
                    }
                </div>
                <PostBody body={post.body} image={post.image} />
                <PostFooter postId={post.id} commentNumber={comments.length} />

                <form onSubmit={createComment} className='flex items-center gap-2 mb-2'>
                    <Input value={commentContent} onChange={(e) => setCommentContent(e.target.value)} variant='bordered' placeholder='Add a comment' />
                    <Button isLoading={loading} type='submit' disabled={commentContent.length < 2} color='primary'>Add Comment</Button>
                </form>

                {comments.length > 0 &&
                    comments.slice(0, commentLimit).map((comment, index) => <Comment postUserId={post.user._id} comment={comment} callBack={getPostComments} key={comment._id || index} />)
                }
            </div>
        }


    </>
}