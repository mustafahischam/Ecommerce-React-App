import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
// import staticImage from '../assets/blank-profile-picture-973460_1280.webp'
import { useState } from "react";
import { createPostApi } from "../Services/postService";
import LoadingScreen from "./LoadingScreen";
import { Spinner } from "@heroui/spinner";
import { updatePostApi } from "../Services/postService";
import { updateCommentApi } from "../Services/commentService";

export default function CreatePost({ callBack, post, comment, isUpdating, setIsUpdating, onCreated }) {

    const [PostBody, setPostBody] = useState(post?.body ?? comment?.content ?? '')
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(post?.image ?? '')
    const [loading, setLoading] = useState(false)

    const isEditingComment = Boolean(isUpdating && comment)

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append('body', PostBody)
        let response
        if (image) {
            formData.append('image', image)
        }
        if (isUpdating && post) {
            response = await updatePostApi(formData, post.id)
        } else if (isEditingComment) {
            response = await updateCommentApi(PostBody, comment._id)
        } else {
            response = await createPostApi(formData)
        }

        if (response.message) {
            if (onCreated && response.post) {
                try { onCreated(response.post) } catch { }
            }
            await callBack()
            setPostBody('')
            setImage(null)
            setImageUrl('')
            if (setIsUpdating) {
                setIsUpdating(false)
            }
        }
        setLoading(false)
    }

    function handleImage(e) {
        setImage(e.target.files[0])
        setImageUrl(URL.createObjectURL(e.target.files[0]))
        e.target.value = null
    }
    return <>
        <div className="bg-white rounded-md shadow-md  py-3 px-3 my-5 overflow-hidden">
            <form onSubmit={handleSubmit}>
                <Textarea value={PostBody} onChange={(e) => setPostBody(e.target.value)} className="w-full bg-gray-100 p-4 mb-1"
                    rows={4} name="" id="" placeholder="What's on your mind?" />

                {imageUrl && <div className="relative">
                    <img src={imageUrl} className="w-full" alt="" />
                    <svg onClick={() => { setImageUrl(''); setImage(null) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" cursor-pointer size-6 absolute top-4 right-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>

                </div>}
                <div className="flex justify-between items-center">
                    <label className="cursor-pointer hover:text-primary flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500 hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
                            <circle cx="8.5" cy="11.5" r="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
                            <path d="M21 19l-5.5-6.5-4.5 5.5-2.5-3L3 19" stroke="currentColor" strokeWidth="2" fill="none" />
                        </svg>
                        <span className="text-sm">Upload Image</span>
                        <Input onChange={handleImage} type="file" className="hidden" title=" " label="Upload Image" color="transparent" />
                    </label>
                    {isUpdating && <Button color="default" onPress={() => setIsUpdating(false)}>Cancel</Button>}
                    <div className="flex items-center gap-2">
                        <Button color="primary" type="submit" {...(!isEditingComment ? { isLoading: loading } : {})}>
                            {isUpdating && post ? 'Update Post' : isEditingComment ? 'Update Comment' : 'Post'}
                        </Button>
                        {isEditingComment && loading && <Spinner size="sm" />}
                    </div>
                </div>
            </form>
        </div>
    </>
}
