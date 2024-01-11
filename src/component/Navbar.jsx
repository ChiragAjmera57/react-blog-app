import { Alert, Modal, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "./Auth";
import { useAuth } from "./AuthContext";

export const Navbar = () => {
  const [authModal, setAuthModal] = useState(false);
   const [AuthType, setType] = useState(false);
   const navigate = useNavigate()
  const {user,userLogin,logout} = useAuth()
  const[success,setSucces] = useState(false)
  const handleModalClose = ()=>{
    setAuthModal(false)
  }
  const handleModalOpen = (data)=>{
    if(data){
      setType(true)
    }
    else{
      setType(false)
    }
    setAuthModal(true)
  }
  const succesTrue = ()=>{
    setSucces(true)
  }
  const handleLogout = ()=>{
    localStorage.clear()
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 d-flex justify-content-between">
      <Link className="navbar-brand mx-3" to={"/"}>
        Blog
      </Link>
      
      {user?<div>
        <svg onClick={()=>navigate('/post/add')} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Write"><path d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z" fill="currentColor"></path><path d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2" stroke="currentColor"></path></svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          className="bi bi-person mx-5"
          viewBox="0 0 16 16"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
        </svg>
        <svg onClick={()=>handleLogout()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="logout"><g data-name="Layer 2"><g data-name="log-out"><rect width="1" height="4" opacity="0" transform="rotate(90 12 12)"></rect><path d="M7 6a1 1 0 0 0 0-2H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h2a1 1 0 0 0 0-2H6V6zM20.82 11.42l-2.82-4a1 1 0 0 0-1.39-.24 1 1 0 0 0-.24 1.4L18.09 11H10a1 1 0 0 0 0 2h8l-1.8 2.4a1 1 0 0 0 .2 1.4 1 1 0 0 0 .6.2 1 1 0 0 0 .8-.4l3-4a1 1 0 0 0 .02-1.18z"></path></g></g></svg>
        </div>:<div className="mx-3 border-2 border-black" >
       <div className='d-flex align-items-center justify-content-center align-self-center'>
       <button onClick={()=>handleModalOpen(true)} className=' border-0 p-2  custom-bg-green text-white rounded-5' style={{width:'90px'}}>Login</button>
        <p onClick={()=>handleModalOpen(false)} className='d-inline mx-4 custom-Geologiw fw-normal text-muted mt-2'>Signup</p>
       </div>
      </div>}
      <Modal
      open={authModal}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       <><Auth closeModal={handleModalClose} succesTrue={succesTrue} data={AuthType} /></>
      </Modal>
      <Snackbar
      open={success} autoHideDuration={4000} onClose={()=>setSucces(false)}>
        <Alert onClose={()=>setSucces(false)} severity="success" sx={{ width: '100%' }}>
          User Succesfully logged
        </Alert>
      </Snackbar>
    </nav>
  );
};
