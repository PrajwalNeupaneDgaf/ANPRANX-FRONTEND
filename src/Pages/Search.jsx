import React from 'react'
import Layout from '../Layout/Layout'
import { useParams } from 'react-router-dom'
import SearchCard from '../Components/SearchCard'

const Search = () => {
  const {data} = useParams()
  return (
    <Layout>
      <h2 className='text-lg text-gray-500 my-3 font-semibold'>
        Search results for: {data}
      </h2>
      {
        Array.from({length:12}).fill('').map((itm,idx)=>{
          return(
            <SearchCard key={idx}/>
          )
        })
      }
    </Layout>
  )
}

export default Search