import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { useParams } from 'react-router-dom'
import SearchCard from '../Components/SearchCard'
import LoadingComponent from '../Components/LoadingComponent'
import instance from '../axios'
import {toast} from "react-hot-toast"
const Search = () => {
  const {data} = useParams()

  const [Loading, setLoading] = useState(true)
  const [Datas, setDatas] = useState([])

  useEffect(()=>{
    instance.post('/friend/search',{query:data})
    .then(res=>{
      const data = res.data.data
      console.log(res.data)
      setDatas(data)
    })
    .catch(err=>{
      console.log(err)
      toast(err?.response?.data.message || "Error Fetching")
    })
    .finally(()=>{
      setLoading(false)
    })
  },[data])

  if(Loading) return <LoadingComponent/>
  return (
    <Layout>
      <h2 className='text-lg text-gray-500 my-3 font-semibold'>
        Search results for: {data}
      </h2>
      {
        Datas?.map((itm,idx)=>{
          return(
            <SearchCard key={idx} data={itm}/>
          )
        })
      }
      {
        Datas?.length == 0  &&
        <div className='tex-3xl font-semibold text-gray-500 h-40 flex justify-center items-center'>
          NO RESULTS !!
        </div>
      }
    </Layout>
  )
}

export default Search