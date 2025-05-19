import React from 'react'
import Layout from '../Layout/Layout'
import { useState } from 'react'
import LoadingComponent from '../Components/LoadingComponent'
import { useEffect } from 'react'
import instance from '../axios'
import toast from 'react-hot-toast'
import PostCard from '../Components/PostCard'

const Saved = () => {
    const [Posts, setPosts] = useState([])
    const [Loading, setLoading] = useState(true)

    useEffect(()=>{
        instance.get('/post/saves')
        .then(res=>{
            const data = res.data
            setPosts(data.data)
        })
        .catch(err=>{
            toast.error(err.response.data.message ||"Error Fetching")
        })
        .finally(()=>{
            setLoading(false)
        })
    },[])


    if(Loading) return <LoadingComponent/>
  return (
    <Layout bg='bg-gray-100'>
        <div className='text-lg font-semibold px-3 py-2 text-gray-600'>
            Saved Post
        </div>
        {
            Posts?.length==0 &&
            <div className='flex justify-center items-center font-semibold text-lg text-gray-600 md:text-xl h-60'>
                NO SAVED POST
            </div>
        }

        {
            Posts?.map((itm,idx)=>{
                return(<PostCard data={itm}/>)
            })
        }
    </Layout>
  )
}

export default Saved