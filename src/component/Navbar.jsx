import { Modal } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Auth } from "./Auth";

export const Navbar = () => {
  const [authModal, setAuthModal] = useState(false);
  
  const handleModalClose = ()=>{
    setAuthModal(false)
  }
  const handleModalOpen = ()=>{
    setAuthModal(true)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 d-flex justify-content-between">
      <Link className="navbar-brand mx-3" to={"/"}>
        Blog
      </Link>
      <div className="mx-3" onClick={()=>handleModalOpen()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          className="bi bi-person"
          viewBox="0 0 16 16"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
        </svg>
      </div>
      <Modal
      open={authModal}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       <Auth closeModal={handleModalClose} />
      </Modal>
    </nav>
  );
};
