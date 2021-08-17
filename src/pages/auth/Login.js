import React,{useState,useEffect} from "react";
import {auth, googleAuthProvider} from '../../firebase';
import{toast} from 'react-toastify';
import { Button } from "antd";
import { MailOutlined,GoogleOutlined} from '@ant-design/icons'; 
import { useDispatch,useSelector} from "react-redux";
import { Link } from "react-router-dom";
import {createOrUpdateUser} from "../../functions/auth";



const Login = ({history}) =>{    
    const[email,setEmail] = useState("vansha1707@gmail.com");
    const[password,setPassword] = useState("111111");
    const[loading,setLoading]=useState(false);

    const{user}=useSelector((state)=>({...state}));
    
    useEffect(()=>{
        let intended=history.location.state;
        if(intended){
            return;
        }else{
            if(user && user.token) {
                history.push("/");
            }
        }
        
    },[user,history]);

    let dispatch=useDispatch();

    const roleBasedRedirect = (res) =>{
        //check if intended
        let intended=history.location.state;
        if(intended){
            history.push(intended.from);
        }else{
            if(res.data.role==="admin"){
                history.push("/admin/dashboard");
            }else{
                history.push("/user/history");
            }
        }
        
    };

    const handleSubmit =async(e)=>{
        e.preventDefault();
        setLoading(true);

        try {
            const result= await auth.signInWithEmailAndPassword(email,password);

            const{user} = result;
            const idTokenResult=await user.getIdTokenResult();

            createOrUpdateUser(idTokenResult.token)
            .then((res)=>{
                dispatch({
                type: 'LOGGED_IN_USER',
                payload: {
                    name:res.data.name,
                  email: res.data.email,
                  token: idTokenResult.token,
                  role: res.data.role,
                  _id:res.data._id,
                },
              });
              roleBasedRedirect(res);
              })
              .catch(err => console.log(err));           
            //   history.push('/');
        } catch (error) {
            toast.error(error.message);
            setLoading(false);

        }

       
    };
    
    


    const googleLogin= async ()=>{
        auth.signInWithPopup(googleAuthProvider)
        .then(async(result)=>{
            const{user}=result;
            const idTokenResult=await user.getIdTokenResult();

            createOrUpdateUser(idTokenResult.token)
            .then((res)=>{
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                        name:res.data.name,
                    email: res.data.email,
                    token: idTokenResult.token,
                    role: res.data.role,
                    _id:res.data._id,
                    },
                });
                roleBasedRedirect(res);
              })
              .catch(err => console.log(err));
            //   history.push('/');
            
        })
        .catch((err) => {
            toast.error(err.message);
        })
    };
    const loginForm = () => (
    <form onSubmit={handleSubmit}>

        <div class="form-group">
            <input type="email" class="form-control" 
            placeholder="Email" 
            value={email} 
            onChange={(e) =>setEmail(e.target.value)} 
            autoFocus/>
        </div>
        
        <div class="form-group">
            <input type="password" class="form-control" 
            placeholder="Password" 
            value={password} 
            onChange={(e) =>setPassword(e.target.value)} 
            />
        </div>
        

<br/>

        <Button onClick={handleSubmit} 
        class="mb-3" 
        type="primary"
        block shape="round" 
        icon={<MailOutlined/>} 
        size="large" 
        disabled={!email || password.length<6}
        >Log In with Email/Password</Button>
    </form>)
    return (
        <div class="container p-5">
            <div class="row">
                <div class="col-md-6 offset-md-3">
                    {loading ? <h4 class="text-danger">Loading...</h4>:(<h4>Login</h4>)}
                    
                    {loginForm()}
                    <br/>
                    <Button onClick={googleLogin} 
                    class="mb-3" 
                    type="danger"
                    block shape="round" 
                    icon={<GoogleOutlined/>} 
                    size="large" 
                    
                    >Log In with Google</Button>

                    <Link to="/forgot/password"
                    class="text-danger float-right">
                        Forgot Password
                    </Link>
                </div>
            </div>
            
        </div>
    );
};

export default Login;