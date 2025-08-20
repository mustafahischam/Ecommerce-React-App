import PostHeader from "./Card/PostHeader"
import { AuthContext } from "../Context/AuthContext"
import { useContext, useState } from "react"
import DropDownAction from "./DropDownAction"
import CreatePost from "./CreatePost"

const RouteProfilePhoto = "https://linked-posts.routemisr.com/uploads/default-profile.png"

export default function Comment({ comment, postUserId, callBack }) {
    const { userData } = useContext(AuthContext)
    const [isUpdating, setIsUpdating] = useState(false)

    const isOwnComment = userData?._id === comment.commentCreator._id
    const displayPhoto = (isOwnComment ? userData?.photo : comment.commentCreator?.photo) || RouteProfilePhoto

    return <>
        {isUpdating ?
            <CreatePost comment={comment} callBack={callBack} isUpdating={isUpdating} setIsUpdating={setIsUpdating} /> :
            <div className="p-4 bg-gray-100 -mx-3 -mb-3">
                <div className="w-full h-16 flex items-center justify-between ">
                    <PostHeader
                        photo={displayPhoto}
                        name={comment.commentCreator.name}
                        date={comment.createdAt} />
                    {(userData?._id === comment.commentCreator._id || userData._id === postUserId) &&
                        <DropDownAction
                            commentId={comment._id}
                            callBack={callBack}
                            setIsUpdating={setIsUpdating}
                            isCommentOwner={userData?._id === comment.commentCreator._id}
                        />
                    }
                </div>
                <p className='p-4 pb-0'>{comment.content}</p>
            </div>
        }
    </>
}