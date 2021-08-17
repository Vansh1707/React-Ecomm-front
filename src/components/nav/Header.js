import React,{useState} from "react";
import { Menu , Badge} from 'antd';
import {  SettingOutlined ,ShoppingOutlined,ShoppingCartOutlined,HomeOutlined,UserOutlined,UserAddOutlined,DashboardOutlined, LogoutOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch,useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "../forms/Search";

const { SubMenu,Item } = Menu;

const Header = () => {
    const[current,setcurrent]=useState('home');
    
    let dispatch=useDispatch();
    let {user , cart}=useSelector((state) => ({...state}));
    let history=useHistory();

    const handleClick = (e) =>{
        setcurrent(e.key);
    };

    const logout=()=>{
      firebase.auth().signOut();
      dispatch({
        type: "LOGOUT",
        payload:null,
      });
      history.push("/login");
    };

    return(
      <Menu key={0} onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      <Item className="" key="shop" icon={<ShoppingOutlined />}>
        <Link to="/shop">Shop</Link>
      </Item>

      <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
      </Item>

      <Item className="p-2 ml-auto">
        <Search />
      </Item>

      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="">
          <Link to="/register">Register</Link>
        </Item>
      )}

      {!user && (
        <Item key="login" icon={<UserOutlined />} className="">
          <Link to="/login">Login</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]}
          className=""
          key={1}
        >
          {user && user.role === "subscriber" && (
            <Item>
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}

           {user && user.role==="admin" && (
          <Item icon= {<DashboardOutlined />}>
            <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
            )}

            <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>

        </SubMenu>
      )}

     
    </Menu>
    );
};

export default Header;