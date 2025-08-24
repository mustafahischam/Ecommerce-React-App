import React from 'react'
import PostHeader from './PostHeader.jsx'
import PostBody from './PostBody.jsx'
import PostFooter from './PostFooter.jsx'
import Comment from '../Comment.jsx'
import { Link } from 'react-router-dom'
import { Input } from '@heroui/react'
import { Button } from '@heroui/react'
import { useState } from 'react'
import { createCommentApi } from '../../Services/commentService.js'
import LoadingScreen from '../LoadingScreen.jsx'
import { AuthContext } from '../../Context/AuthContext.jsx'
import { useContext } from 'react'
import DropDownAction from '../DropDownAction.jsx'
import { getPostCommentsApi } from '../../Services/commentService.js'
import CreatePost from '../CreatePost.jsx'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// import { useForm } from 'react-hook-form'
// import { useForm } from 'react-hook-form'
export default function PostCard({ post, commentLimit, callBack }) {
    const [commentContent, setCommentContent] = useState('')
    const { userData } = useContext(AuthContext)
    const [isUpdating, setIsUpdating] = useState(false)
    const queryClient = useQueryClient()

    const { data: comments = [] } = useQuery({
        queryKey: ['postComments', post.id],
        queryFn: () => getPostCommentsApi(post.id),
        select: (data) => {
            const list = Array.isArray(data?.comments) ? data.comments : []
            return list.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        },
        initialData: () => {
            const sorted = Array.isArray(post.comments)
                ? post.comments.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                : [];
            return { comments: sorted }
        }
    })

    // async function createComment(e) {
    //     e.preventDefault();
    //     setLoading(true)
    //     const response = await createCommentApi(commentContent, post.id)
    //     if (response.message) {
    //         setCommentContent('')
    //         await getPostComments()
    //     }
    //     setLoading(false)
    // }
    const { mutateAsync: createComment, isPending } = useMutation({
        mutationKey: ['createComment'],
        mutationFn: (commentContent) => createCommentApi(commentContent, post.id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['postComments', post.id] })
        },
        onError: (error) => {
            console.log(error.response.data)
        }
    })
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

                <form onSubmit={(e) => {
                    e.preventDefault()
                    createComment(commentContent)
                    setCommentContent('')
                }} className='flex items-center gap-2 mb-2'>
                    <Input value={commentContent} onChange={(e) => setCommentContent(e.target.value)} variant='bordered' placeholder='Add a comment' />
                    <Button isLoading={isPending} type='submit' disabled={commentContent.length < 2} color='primary'>Add Comment</Button>
                </form>

                {comments.length > 0 &&
                    comments.slice(0, commentLimit).map((comment, index) => <Comment postUserId={post.user._id} comment={comment} callBack={() => queryClient.invalidateQueries({ queryKey: ['postComments', post.id] })} key={comment._id || index} />)
                }
            </div>
        }


    </>
}