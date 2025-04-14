import React from 'react'
import Layout from '../Layout/Layout'
import { IoCheckmarkDone } from 'react-icons/io5'
import NotificationCard from '../Components/NotificationCard'

const Notification = () => {
  return (
    <Layout bg='bg-gray-100'>
        <div className='bg-white rounded-xl p-3 my-1 md:my-2 pb-12 shadow-xl h-[83dvh] overflow-hidden md:h-[87dvh]'>
          <div className='flex justify-between items-center'>
            <strong className='text-gray-700 text-lg md:text-xl select-none'>
              Notifications
            </strong>

            <button className='flex text-sm justify-center py-1 px-3 border rounded border-solid border-gray-200 items-center cursor-pointer text-yellow-700 font-semibold'>
              Mark Checked <IoCheckmarkDone size={19}/> 
            </button>
          </div>
          <hr className="mt-3 border border-solid border-gray-400" />
          <div className='flex flex-col  h-full overflow-y-scroll noScrollBar'>
            <NotificationCard/>
            <NotificationCard/>
            <NotificationCard/>
            <NotificationCard/>
            <NotificationCard/>
            <NotificationCard/>
            <NotificationCard/>
            <NotificationCard/>
            <NotificationCard/>
          </div>
        </div>
    </Layout>
  )
}

export default Notification