import React from 'react'
import {  formatDate } from '../utils/util';

export const Card = ({post}) => {
    const {
        title,
        text,
        published_date,
        image,
        auther,
        category,
      } = post;
  return (
    <>
    
    <div class='d-flex w-50 justify-content-between p-2 mb-3 m-auto'>
      <div>
        <div class=''>
          <div class='d-flex flex-row m-auto'>
            {image?<img src={image}width='24' height='24' class='rounded-5 mx-1' alt="" srcset="" />:<img width='24' height='24' class='rounded-5 mx-1' src='https://miro.medium.com/v2/resize:fill:30:30/1*QADoVQ9X8JvC9DL_2W_LIw.jpeg' />}
            
            <p >{auther.username}</p>
            <p class='mx-1'>.</p>
            <p class='text-muted'>{formatDate(published_date)}</p>
          </div>
          <p class='fw-bold fs-4 w-75 lh-1'>{title}</p>
          <p class='w-25 overflow-hidden' style={{height:'30px'}} dangerouslySetInnerHTML={{ __html: text }}></p>
        </div>
        <div>
         <span class="badge bg-secondary">{category?.title?category.title:""}</span>
        </div>
      </div>
        {image?<img  src={image} width='112' height='112' alt="" srcset="" />:<img  src={`https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg`} width='112' height='112' alt="" srcset="" />}
    </div>
        <hr class='bg-dark text-muted w-50 m-auto' />
    
    </>
  )
}
