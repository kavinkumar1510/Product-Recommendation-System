import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast'
function Signup() {
    const[email,SetEmail]=useState("");
    const[password,SetPassWord]=useState("");
    const navigate = useNavigate()
    const handlesignup = async(e) =>{
      console.log("hello" + email , password);
e.preventDefault();
if(email =="" || password == ""){
    return
}
else{
    await axios.post("http://localhost:3002/signup",{
        email : email,
        password : password
    }).then((response)=>{
        if(response.data.success){
          toast.success(response.data.success);
          navigate("/signin")
        }
        if(response.data.error){
          toast.error(response.data.error);
        }
    })
}
    }
  return (
   <div style={{
height:"100vh" ,
backgroundSize:"cover",
display:"flex",
justifyContent:"center",
alignItems:"center"
  }}>
    <Toaster />
    <div className='wrapper p-3'>
      <h4 className='text-center text-uppercase text-dark mt-3 fw-bold t' style={{
      letterSpacing:"2px"
      }}>Register Now!</h4>
      <p className='mt-1 text-center'>You can signup with you social account below.</p>
      <div className='p-3 text-center'>
        <input type='email' required={true} placeholder='email' value={email} onChange={(e)=>SetEmail(e.target.value)} className='form-control my-3'/>
        <input type='password' required={true} placeholder='password' value={password} onChange={(e)=>SetPassWord(e.target.value)} className='form-control mb-0 my-3'/>
        <button  className='login_btn mt-3 w-100' onClick={handlesignup}>
          Sign Up
        </button>
      <div className='mt-3 p-1'>
        <span className='text-dark ' style={{
          cursor:"pointer"
        }} onClick={()=>navigate('/signin')}>Already have an account? <span style={{color:"#f50963"}}> Log in</span> </span>
      </div>
      </div>
    </div>
    </div>
  );
}

export default Signup;
