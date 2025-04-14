import React from 'react'
import { IoClose } from 'react-icons/io5'

const SettingOverDisplay = ({children,setDisplay,Header}) => {
  return (
    <div onClick={()=>{
        setDisplay(false)
    }} className='fixed inset-0 bg-[#00000052] flex justify-center items-center'>
        <div onClick={(e)=>{
            e.stopPropagation()
        }} className='bg-white shadow-xl w-full md:w-[30rem] p-2'>
            <div className='flex justify-between py-2 '>
                <strong className='text-gray-700 font-semibold text-sm md:text-lg'>
                    {Header}
                </strong>
                <IoClose size={21} color='red' onClick={()=>{
                    setDisplay(false)
                }}/>
            </div>
            {children}
        </div>
    </div>
  )
}

export default SettingOverDisplay