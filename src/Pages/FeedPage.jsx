import React from 'react'
import { Button } from '@heroui/react'
import PostCard from '../Components/Card/PostCard'
// import { getAllPostsApi } from '../Services/postService'
// import { useState, useEffect } from 'react'
import LoadingScreen from '../Components/LoadingScreen'
import CreatePost from '../Components/CreatePost'
import { useQuery } from '@tanstack/react-query'
import { getAllPostsApi } from '../Services/postService'
export default function FeedPage() {





  const { data: posts, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: getAllPostsApi,
    select: (data) => data.data.posts,
    retry: 0,
    retryOnMount: false,
    // refetchOnMount: false,


  })
  console.log("rocket icon feed page", posts)
  return <>

    {/* <h1 className='text-red-500'> isLoading : {isLoading.toString()}</h1>
<h1 className='text-red-500'>isFetching : {isFetching.toString()}</h1>
<h1 className='text-red-500'>isError : {isError.toString()}</h1> */}
    {/* <h1 className='text-red-500'>error : {error.message}</h1> */}
    <div className="w-2xl mx-auto">

      <CreatePost callBack={refetch} />
      {/* {posts.length == 0 ? <LoadingScreen /> :
        posts.map((post) => <PostCard key={post.id} post={post} commentLimit={1} callBack={getAllPosts} />)} */}
      {isLoading ? <LoadingScreen /> : isError ? <h1 className='text-red-500'>Error : {error.message}</h1> :
        posts?.map((post) => <PostCard key={post.id} post={post} commentLimit={1}  />)}

    </div>

  </>

}