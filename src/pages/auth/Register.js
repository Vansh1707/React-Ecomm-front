import React,{useState,useEffect} from "react";
import {auth} from '../../firebase';
import{toast} from 'react-toastify';
import { useSelector} from "react-redux";



const Register = ({history}) =>{    
    const[email,setEmail] = useState("");

    const{user}=useSelector((state)=>({...state}));
    useEffect(()=>{
        if(user && user.token) {
            history.push("/");
        }
    },[user,history]);

    const handleSubmit =async(e)=>{
        e.preventDefault()
        // const config={
        //     url: process.env.REACT_APP_REDIRECT_URL,
        //     handleCodeInApp : true,
        // }
        const config = {
            url: 'http://localhost:3000/register/complete',
            handleCodeInApp: true,
          };
        await auth.sendSignInLinkToEmail(email,config);
        toast.success(`Email is sent to ${email}. Click the link to complete your registration.`);

        //save user email in local storage
        window.localStorage.setItem('emailForRegistration',email);
        //clear state
        setEmail("");
    };
    
    
    const registerForm = () => (
    <form onSubmit={handleSubmit}>
        <input type="email" class="form-control" 
        placeholder="Email" 
        value={email} 
        onChange={(e) =>setEmail(e.target.value)} 
        autoFocus/>

<br/>

        <button type="submit" class="btn btn-raised btn-primary btn-lg">Register</button>
    </form>)
    return (
        <div class="container p-5">
            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    
                    {registerForm()}
                </div>
            </div>
            
        </div>
    );
};

export default Register;