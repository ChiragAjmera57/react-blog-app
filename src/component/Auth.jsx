import React, { useEffect, useState } from "react";
import { login, signUp } from "../utils/util";
import { Alert, Snackbar } from "@mui/material";
import { useAuth } from "./AuthContext";

export const Auth = ({closeModal,succesTrue,data}) => {
  const [AuthType, setType] = useState(data);
  const[error,setError] = useState(false)
  const[success,setSucces] = useState(false)
  const {user,userLogin,logout} = useAuth()
  const [registerState, setRegisterState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginState, setLoginState] = useState({
    username: "",
    password: ""
  });
  useEffect(() => {}, []);
  const handleRegChange = (e) => {
    setRegisterState((pre) => ({
      ...pre,
      [e.name]: e.value
    }));
    
  };
  const handleLogChange = (e) => {
    setLoginState((pre) => ({
      ...pre,
      [e.name]: e.value
    }));
  };
  const handleLogin = (e)=>{
    e.preventDefault()
    login(loginState).then((res)=>{
      succesTrue()
      // console.log(res)
      setError(false)
      const {token,user} = res
      const {id} = user
      // console.log(id)
      localStorage.setItem("token-react-blog",token)
      localStorage.setItem("user-react-blog",JSON.stringify(user))
      localStorage.setItem("id-user-react-blog",JSON.stringify(id))
      userLogin()
      closeModal()
    }).catch((err)=>{
      console.log(err)
      
      setError(err.message)
    })
  }
  const handleRegister = (e)=>{
    e.preventDefault()
    signUp(registerState).then((res)=>{
      setError(false)
      setSucces(true)
      setType(true)
    }).catch((err)=>{
      
      setSucces(false)
      setError(err.message)
    })
  }
  return (
    <div className=" w-50 m-auto">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-xl-9 mx-auto">
            <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden center">
              <div className="card-img-left d-none d-md-flex"></div>

              <div className="card-body p-2 p-sm-3">
                {AuthType ? (
                  <div className='d-flex align-items-center justify-content-center'>
                  
                  <h5 className="card-title text-center mb-2 fw-light h2 fw-bold">
                    Login
                  </h5>
                  <svg onClick={()=>closeModal()}  width="24" height="24" viewBox="0 0 24 24" fill="none" className="bz ic position-absolute top-0 end-0 mx-3 mt-3"><path d="M5 5l7 7m7 7l-7-7m0 0l7-7m-7 7l-7 7" stroke="currentColor" strokeLinecap="round"></path></svg>
                  </div>
                ) : (
                  <div className='d-flex align-items-center justify-content-center'>
                  
                  <h5 className="card-title text-center mb-2 fw-light h2 fw-bold">
                    Register
                  </h5>
                  <svg onClick={()=>closeModal()}  width="24" height="24" viewBox="0 0 24 24" fill="none" className="bz ic position-absolute top-0 end-0 mx-3 mt-3"><path d="M5 5l7 7m7 7l-7-7m0 0l7-7m-7 7l-7 7" stroke="currentColor" strokeLinecap="round"></path></svg>
                  </div>
                )}
                <br />
                <form>
                  {AuthType ? (
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInputUsername"
                        placeholder="myusername"
                        required
                        value={loginState.username}
                        onChange={(e) => handleLogChange(e.target)}
                        name="username"
                      />
                      <label htmlFor="floatingInputUsername">Username/Email</label>
                    </div>
                  ) : (
                    <div>
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInputUsername"
                          placeholder="myusername"
                          required
                          name="username"
                          value={registerState.username}
                          onChange={(e) => handleRegChange(e.target)}
                        />
                        <label htmlFor="floatingInputUsername">Username</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control"
                          id="floatingInputEmail"
                          placeholder="name@example.com"
                          name="email"
                          value={registerState.email}
                          onChange={(e) => handleRegChange(e.target)}
                        />
                        <label htmlFor="floatingInputEmail">Email address</label>
                      </div>
                    </div>
                  )}
                  <div className="form-floating mb-3">
                    {AuthType ? (
                      <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        name="password"
                        value={loginState.password}
                        onChange={(e) => handleLogChange(e.target)}
                      />
                    ) : (
                      <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        name="password"
                        value={registerState.password}
                        onChange={(e) => handleRegChange(e.target)}
                      />
                    )}
                    <label htmlFor="floatingPassword">Password</label>
                  </div>

                  <div className="d-grid mb-2">
                    {AuthType ? (
                      <button
                        className="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
                        type="submit"
                        onClick={(e)=>handleLogin(e)}
                      >
                        Login
                      </button>
                    ) : (
                      <button
                        className="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
                        type="submit"
                        onClick={(e)=>handleRegister(e)}
                      >
                        Register
                      </button>
                    )}
                  </div>

                  {AuthType ? (
                    <div
                      className="d-block text-center mt-2 small"
                      onClick={() => setType(false)}
                    >
                      New user? Sign up
                    </div>
                  ) : (
                    <div
                      className="d-block text-center mt-2 small"
                      onClick={() => setType(true)}
                    >
                      Have an account? Sign In
                    </div>
                  )}
                  <br />
                  <hr className="my-2" />
                  {/* <br />
              <div className="d-grid mb-2">
                <button className="btn btn-lg btn-google-icon btn-login fw-bold fs-6 text-uppercase">
                  <i className="fab fa-google"></i> Sign up with Google
                </button>
              </div>

              <div className="d-grid mb-2">
                <button className="btn btn-lg btn-facebook-icon btn-login fs-6 fw-bold text-uppercase">
                  <i className="fab fa-facebook"></i> Sign up with Facebook
                </button>
              </div>

              <div className="d-grid mb-1">
                <button className="btn btn-lg btn-twitter-icon btn-login fs-6 fw-bold text-uppercase">
                  <i className="fab fa-twitter"></i> Sign up with Twitter
                </button>
              </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
      open={error} autoHideDuration={4000} onClose={()=>setError(false)}>
        <Alert onClose={()=>setError(false)} severity="error" sx={{ width: '100%' }}>
          {error?error:null}
        </Alert>
      </Snackbar>
      {!AuthType&&<Snackbar
      open={success} autoHideDuration={4000} onClose={()=>setSucces(false)}>
        <Alert onClose={()=>setSucces(false)} severity="success" sx={{ width: '100%' }}>
          Proceed to login
        </Alert>
      </Snackbar>}
    </div>
  );
};
