import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";
const Protected = ({children}) => {
const {user,userLogin,logout} = useAuth()
useEffect(()=>{
  console.log(user,"user...")
},[user])
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Protected;