import React from 'react';
import {  formatDate } from '../utils/util';
import 'bootstrap/dist/css/bootstrap.min.css';

const Post = ({ post }) => {
  const {
    title,
    text,
    created_date,
    published_date,
    image,
    feature_img,
    auther,
    category,
    tag,
  } = post;
 

  return (
    <div className="post">
      <h2 className='mt-5'>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: text }} />
      <p>Created Date: {formatDate(created_date)}</p> 
      <p>Published Date: { formatDate(published_date)}</p>
      {feature_img? <img src={feature_img} alt="Feature Image" />:null}
     
      
      <div className="author">
        <h3>Author: {auther.username}</h3>
        <p>City: {auther.city}</p>
        <p>State: {auther.state}</p>
        <p>Country: {auther.country}</p>
        <p>Email: {auther.email}</p>
      </div>

      <div className="category">
        <h3>Category: {category?.title?category.title:""}</h3>
        <p>{category?.description?category.description:""}</p>
      </div>

      <div className="tags">
        <h3>Tags:</h3>
        {tag.map((t) => (
          <div key={t.id}>
            <p>{t.name}</p>
            <p>{t.description}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default Post;
