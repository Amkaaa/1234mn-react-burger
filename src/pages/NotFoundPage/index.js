import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(()=> {
            navigate('/')
        }, 3000)
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <center><p> 404, Уучлаарай хуудас олдсонгүй </p></center>
        </div>
    )
}

export default NotFoundPage