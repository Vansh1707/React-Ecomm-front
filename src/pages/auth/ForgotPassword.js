import React,{useState,useEffect} from "react";
import {auth} from '../../firebase';
import{toast} from 'react-toastify';
import { useSelector} from "react-redux";

const ForgotPassword=({history})=>{
    const[email,setEmail] = useState("");
    const[loading,setLoading]=useState(false);

    const{user}=useSelector((state)=>({...state}));
    useEffect(()=>{
        if(user && user.token) {
            history.push("/");
        }
    },[user,history]);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true)

        const config = {
            url: 'http://localhost:3000/login',
            handleCodeInApp: true,
          };

        await auth.sendPasswordResetEmail(email,config)
        .then(()=>{
            setEmail("");
            setLoading(false);
            toast.success("Click the link sent to you email to reset password");
        })
        .catch((error)=>{
            setLoading(false);
            toast.error("error.message");
            console.log("error in forgot pass",error);
        });
    };

    return(
        <div class="container col-md-6 offset-md-3 p-5">
            {loading ? <h4 class="text-danger">Loading...</h4> : <h4>Forgot Password</h4>}

            <form onSubmit={handleSubmit}>
                <input type="email" 
                class="form-control"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Registered Email"
                autoFocus
                />
                <br/>
                <button class="btn btn-raised btn-info"
                disabled={!email}>
                    Send Email
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
