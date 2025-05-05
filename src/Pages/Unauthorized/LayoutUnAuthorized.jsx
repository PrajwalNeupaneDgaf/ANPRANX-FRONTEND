import React, { useEffect, useState } from 'react'
import { useData } from '../../Context/DataContext'
import { useUser } from '../../Context/UserContext'
import LoadingComponent from '../../Components/LoadingComponent'
import { useNavigate } from 'react-router-dom'

const LayoutUnAuthorized = ({children}) => {
    const {IsAuthorized} = useUser()


    const navigate = useNavigate()

    const [Loading, setLoading] = useState(true)
    useEffect(() => {
      if(IsAuthorized){
        navigate('/')
        return
      }
      setLoading(false)
    }, [IsAuthorized])

    if (Loading) return <LoadingComponent/>
    
  return (
    <div>
        {children}
    </div>
  )
}

export default LayoutUnAuthorized