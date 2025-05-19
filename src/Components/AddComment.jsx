import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../Context/UserContext'
import { IoSendSharp } from 'react-icons/io5'
import toast from 'react-hot-toast'
import instance from '../axios'
import { IoReload } from "react-icons/io5";

const AddComment = ({setComments}) => {
    const {postId} = useParams()
    const {User} = useUser()
    const navigate = useNavigate()
    const [Comment, setComment] = useState('')
    const [isCommenting, setisCommenting] = useState(false)

    const AddComment = async()=>{
        if(isCommenting){
            return
        }
        try {   
            if(!Comment) throw new Error("Comment Cant be Empty")
            setisCommenting(true)
            await instance.post(`/post/add-comment/${postId}`,{Text:Comment})
            toast("Comment added Succesfully")
            setComments(p=>[...p , {User:User , Text:Comment}])
            setComment('')

        } catch (error) {
            toast.error(error.response.data.message ||error.message || "Error Commenting")
        }
        finally{
            setisCommenting(false)
        }
    }

  return (
    <div className='py-1 shadow-lg border border-solid px-3 gap-1 items-center rounded-xl border-gray-200 bg-gray-50 mt-2 mb-2 flex flex-row'>
        <div onClick={()=>{
            navigate(`/profile/${User?._id}`)
        }} className='h-10 w-10 md:h-14 md:w-14 rounded-full cursor-pointer shadow-2xl'>
            <img src={User?.Profile} alt={User?.Name} className='h-full w-full rounded-full object-cover bg-gray-700' />
        </div>
        <input type="text" value={Comment} onChange={(e)=>{
            setComment(e.target.value)
        }} 
        className='flex-1 text-sm md:text-lg p-2 border-none outline-none '
        placeholder='Add Your Comment'
        />
        <button onClick={AddComment} className='w-[2rem] cursor-pointer'>
            {
                isCommenting?<IoReload size={'1.6rem'} className='animate-spin duration-500'/>:<IoSendSharp size={'1.6rem'}/>
            }
        </button>
    </div>
  )
}

export default AddComment