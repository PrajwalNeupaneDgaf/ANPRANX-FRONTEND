import React from 'react'
import {useNavigate} from 'react-router-dom'

const SearchCard = () => {
    const navigate = useNavigate()
  return (
    <div onClick={()=>{
        navigate(`/profile/500`)
    }} className='p-2 w-ful bg-gray-50 border border-solid border-gray-200 cursor-pointer rounded-xl flex flex-row my-2 gap-3 items-center'>
        <div className='h-14 w-14 bg-gray-600 rounded-full'>

        </div>
        <h2 className='font-semibold text-sm md:text-lg hover:underline text-orange-800 cursor-pointer select-none'>
            Prajwal Neupane
        </h2>
    </div>
  )
}

export default SearchCard