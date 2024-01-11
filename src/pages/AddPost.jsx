import React, { useEffect, useState } from "react";
import { fetchCategory, fetchTags, postData } from "../utils/util";

export const AddPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    published_date: "",
    image: null,
    feature_img: null,
    post_cat: "",
    tags: "",
  });
  const [tag,setTags] = useState(null)
  const [category,setCategory] = useState(null)
  const [change,setChange] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name,value)
    const newValue = name === "image" || name === "feature_img" ? e.target.files[0] : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
    setChange(!change)
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    postData(formData).then((res)=>{
    }).catch((err)=>{
        console.log(err)
    })
  };
  
useEffect(()=>{
    fetchTags("http://127.0.0.1:8000/api/tags/").then((res)=>{
        // console.log(res)
        setTags(res.results)
    }).catch((err)=>{
        console.log(err)
    })
    fetchTags("http://127.0.0.1:8000/api/category/").then((res)=>{
        // console.log(res)
        setCategory(res.results)
    }).catch((err)=>{
        console.log(err)
    })
    
},[])
  return (
    <div className="w-50 m-auto d-flex">
      <form onSubmit={handleSubmit} className="w-75 m-auto d-flex flex-column">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          id="text"
          name="text"
          rows="4"
          className="form-control mb-3"
          placeholder="Type your content"
          value={formData.text}
          onChange={handleChange}
          required
        ></textarea>
        

        <input
          type="date"
          id="published_date"
          name="published_date"
          className="form-control mb-3"
          value={formData.published_date}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          id="image"
          name="image"
          className="form-control mb-3"
          onChange={handleChange}
          placeholder="Provide thumbnail"
          required
        />
        <input
          type="file"
          id="feature_img"
          name="feature_img"
          className="form-control mb-3"
          onChange={handleChange}
          placeholder="Provide blog image"
          required
        />
        <select name="tags" id="" value={formData.tags} className='form-select mb-3' onChange={handleChange}>
            <option value="">--Select Tag--</option>
            {tag?.map(ele=>{
                return(<option key={ele.id} value={ele.id}>{ele.name}</option>)
            })}
        </select>

        <select name="post_cat" id="" value={formData.post_cat} className='form-select mb-3' onChange={handleChange}>
            <option value="">--Select category--</option>
            {category?.map(ele=>{
                return(<option key={ele.id} value={ele.id}>{ele.title}</option>)
            })}
        </select>
        <input
          type="submit"
          className=" border-0 w-50 m-auto p-2  custom-bg-green text-white rounded-5"
          value="Submit"
        ></input>
      </form>
    </div>
  );
};
