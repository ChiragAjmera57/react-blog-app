import React, { useEffect, useState } from "react";
import { fetchCategory, fetchTags, postData } from "../utils/util";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const AddPost = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    published_date: "",
    image: null,
    feature_img: null,
    post_cat: "",
    tags: "",
    author:JSON.parse(localStorage.getItem('id-user-react-blog'))
  });
  const [tag,setTags] = useState(null)
  const [category,setCategory] = useState(null)
  const [change,setChange] = useState(false)
  const[createdSlug,setCreatedSlug] = useState(null)
  const[succes,setSucces] = useState(false)
  const[error,setError] = useState(false)
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
    postData(formData).then((res)=>{
      setSucces(true)
      setError(false)
      setCreatedSlug(res.post_slug)
     
    }).catch((err)=>{
      setSucces(false)
      setError(true)
        console.log(err)
    })
  };
  useEffect(()=>{
   if(createdSlug){
    setTimeout(() => {
      navigate(`/post/${createdSlug}`)
    }, 1500);
   }
  },[createdSlug])
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
      <Snackbar
      open={succes} autoHideDuration={4000} onClose={()=>setSucces(false)}>
        <Alert onClose={()=>setSucces(false)} severity="success" sx={{ width: '100%' }}>
          Post Created
        </Alert>
      </Snackbar>
      <Snackbar
      open={error} autoHideDuration={4000} onClose={()=>setError(false)}>
        <Alert onClose={()=>setError(false)} severity="error" sx={{ width: '100%' }}>
          Post not created!
        </Alert>
      </Snackbar>
    </div>
  );
};
