import React from 'react'
import { getDurationString } from '../utils/util'

export const Reply = ({reply}) => {
  console.log(reply)
  return (
    <div className='w-100 ps-5 mt-2'>
        <div class="d-flex ">
    <div class="vr"></div>
    <div class='mx-4'>
    <div className='d-flex align-items-center mb-2'>
                <div className=' bg-secondary rounded-5  text-capitalize me-3 text-white d-flex justify-content-center align-content-center' style={{width:'32px',height:'32px'}}>
                    <p className='mt-1'>{reply?.name[0]}</p>
                </div>
            <div className='d-flex flex-column gap-0'>
            <p className='mb-0'>{reply?.name}</p>
                <p className='mb-0 text-muted'>{getDurationString(reply?.created)}</p>
            </div>
            </div>
            <div>
                <p style={{color:'#242424'}} >
                {reply?.body}
                </p>
            </div>
    </div>
    </div>
        
    </div>
  )
}
