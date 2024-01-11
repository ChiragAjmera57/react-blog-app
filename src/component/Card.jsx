import React from 'react'
import { formatDate } from '../utils/util';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
export const Card = ({post}) => {
    const {
        title,
        text,
        published_date,
        image,
        auther,
        category,
        post_slug
      } = post;
      const navigate = useNavigate()
      const handleDetailNavigate = (slug)=>{
        navigate(`/post/${slug}`)
      }
  return (
    <div >
    
    <div onClick={()=>handleDetailNavigate(post_slug)} className='d-flex w-50 justify-content-between p-2 mb-3 m-auto'>
      <div>
        <div className=''>
          <div className='d-flex flex-row m-auto'>
            {image?<img src={image} width='24' height='24' className='mx-1 rounded-5'  alt="" srcset="" />:<img width='24' height='24' className='rounded-5 mx-1' src='https://miro.medium.com/v2/resize:fill:30:30/1*QADoVQ9X8JvC9DL_2W_LIw.jpeg' />}
            
            <p >{auther?.username}</p>
            <p className='mx-1'>.</p>
            <p className='text-muted'>{formatDate(published_date)}</p>
          </div>
          <p className='fw-bold fs-4 w-75 lh-1'>{title}</p>
          <p className='w-25 overflow-hidden' style={{height:'30px'}} dangerouslySetInnerHTML={{ __html: text }}></p>
        </div>
        <div>
         <span className="badge bg-secondary">{category?.title?category.title:""}</span>
        </div>
      </div>
        {image?<img  src={image} width='135' height='112' alt="" srcset="" />:<img  src={`https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg`} width='112' height='112' alt="" srcset="" />}
    </div>
        <hr className='bg-dark text-muted w-50 m-auto' />
    
    </div>
  )
}
