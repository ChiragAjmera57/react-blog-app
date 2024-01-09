import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { fetchBlog } from './utils/util';
import Post from './component/Post';
import { Card } from './component/Card';

function App() {
  const[data,setData] = useState(null)
  useEffect(()=>{
    fetchBlog().then((res)=>{
      console.log(res.results)
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

export default App;
