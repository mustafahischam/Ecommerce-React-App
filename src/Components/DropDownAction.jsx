import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Spinner } from '@heroui/react'
import { deleteCommentApi } from '../Services/commentService'
import { deletePostApi } from '../Services/postService'
import { useState } from 'react'


export default function DropDownAction({ commentId, postId, callBack, setIsUpdating, isCommentOwner }) {

    const [loading, setLoading] = useState(false)

    async function deleteComment(commentId) {
        setLoading(true)
        const response = await deleteCommentApi(commentId)
        if (response.message) {
            await callBack()
        }
        setLoading(false)
    }

    async function deletePost(postId) {
        setLoading(true)
        const response = await deletePostApi(postId)
        if (response?.message === 'success' || response?.message) {
            await callBack()
        }
        setLoading(false)
    }


    return <>
        {loading ? <Spinner /> :
            <Dropdown>
                <DropdownTrigger>
                    <svg

                        className="w-16 "
                        xmlns="http://www.w3.org/2000/svg"
                        width="27"
                        height="27"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#b0b0b0"
                        strokeWidth="2"
                        strokeLinecap="square"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions" onAction={(key) => {
                    if (key === 'edit-post' && setIsUpdating) {
                        setIsUpdating(true)
                    } else if (key === 'edit-comment' && setIsUpdating) {
                        setIsUpdating(true)
                    } else if (key === 'delete-post' && postId) {
                        deletePost(postId)
                    } else if (key === 'delete-comment' && commentId) {
                        deleteComment(commentId)
                    }
                }}>
                    {postId && setIsUpdating && <DropdownItem key="edit-post">Edit</DropdownItem>}
                    {commentId && isCommentOwner && setIsUpdating && <DropdownItem key="edit-comment">Edit</DropdownItem>}
                    {commentId && (
                        <DropdownItem key="delete-comment" className="text-danger" color="danger">
                            Delete Comment
                        </DropdownItem>
                    )}
                    {postId && (
                        <DropdownItem key="delete-post" className="text-danger" color="danger">
                            Delete Post
                        </DropdownItem>
                    )}
                </DropdownMenu>
            </Dropdown>
        }
    </>
}