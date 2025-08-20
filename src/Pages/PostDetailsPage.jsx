import React from 'react'
import { useParams } from 'react-router-dom'
import { getSinglePostApi } from '../Services/postService'
import { useState, useEffect } from 'react'
import PostCard from '../Components/PostCard'
import LoadingScreen from '../Components/LoadingScreen'
// import { createCommentApi } from '../Services/commentService'

export default function PostDetailsPage() {

  let { id } = useParams()
  const [post, setPost] = useState(null)

  async function getPost() {
    const response = await getSinglePostApi(id)
    if (response.message) {
      setPost(response.post)
    }
  }
  useEffect(() => {
    getPost()
  }, [])

  return <>
    <div className="w-4/6 mx-auto">
      {post ? <PostCard post={post} commentLimit={post.comments.length} callBack={getPost} /> : <LoadingScreen />}
    </div>
  </>
}