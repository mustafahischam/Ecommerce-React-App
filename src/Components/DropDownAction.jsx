import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Spinner, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react'
import { deleteCommentApi } from '../Services/commentService'
import { deletePostApi } from '../Services/postService'
import { useState } from 'react'

export default function DropDownAction({ commentId, postId, callBack, setIsUpdating, isCommentOwner }) {

    const [loading, setLoading] = useState(false)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [pendingPostId, setPendingPostId] = useState(null)

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

    function requestDeletePost(pid) {
        setPendingPostId(pid)
        setConfirmOpen(true)
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
                        requestDeletePost(postId)
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

        <Modal isOpen={confirmOpen} onOpenChange={setConfirmOpen} placement="center">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Confirm Deletion</ModalHeader>
                        <ModalBody>
                            Are you sure you want to delete this post? This action cannot be undone.
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="light" onPress={onClose}>Cancel</Button>
                            <Button color="danger" onPress={async () => {
                                const pid = pendingPostId
                                setConfirmOpen(false)
                                setPendingPostId(null)
                                await deletePost(pid)
                            }}>Delete</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    </>
}