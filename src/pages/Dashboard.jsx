import React, { useEffect, useState } from 'react'
import { fetchBlog } from '../utils/util'
import { Card } from '../component/Card'

export const Dashboard = () => {
    const[data,setData] = useState(null)
    useEffect(()=>{
      fetchBlog().then((res)=>{
        // console.log(res.results)
        setData(res.results)
      })
    },[])
    return (
      <div className="App">
        
        {
          data?.map((ele)=>{
            return(<Card post={ele} key={ele.id} />)
          })
        }
      </div>
    );
}
