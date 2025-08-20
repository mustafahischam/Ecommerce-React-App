import React from 'react'
import { Button } from '@heroui/react'
import PostCard from '../Components/PostCard'
import { getAllPostsApi } from '../Services/postService'
import { useState, useEffect } from 'react'
import LoadingScreen from '../Components/LoadingScreen'
import CreatePost from '../Components/CreatePost'
export default function FeedPage() {

  const [posts, setPosts] = useState([])

  async function getAllPosts() {


    const response = await getAllPostsApi()
    if (response) {
      setPosts(response.posts);
    }
  }

  useEffect(() => {
    getAllPosts()
  }, [])

  return <>


    <div className="w-2xl mx-auto">

      <CreatePost callBack={getAllPosts} />
      {posts.length == 0 ? <LoadingScreen /> :
        posts.map((post) => <PostCard key={post.id} post={post} commentLimit={1} callBack={getAllPosts} />)}

    </div>

  </>

}