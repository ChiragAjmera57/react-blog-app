import React from 'react'
import { Reply } from './Reply'
import { getDurationString } from '../utils/util'

export const Comment = ({comment}) => {
  console.log(comment)
  return (
    <>
     <div className='w-100 mt-4 px-4'>
        <div className='d-flex align-items-center mb-2'>
            <div className=' bg-secondary rounded-5  text-capitalize me-3 text-white d-flex justify-content-center align-content-center' style={{width:'32px',height:'32px'}}>
                <p className='mt-1'>{comment?.name[0]}</p>
            </div>
           <div className='d-flex flex-column gap-0'>
           <p className='mb-0'>{comment?.name}</p>
            <p className='mb-0 text-muted'>{getDurationString(comment?.created)}</p>
           </div>
        </div>
        <div>
            <p style={{color:'#242424'}} >
              {comment?.body}
            </p>
        </div>
    </div>
    {comment?.reply?.map((ele)=>{
      return(<Reply reply={ele} />)
    })}
    </>
   
  )
}
