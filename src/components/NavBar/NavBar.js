import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation }  from 'react-router-dom';
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";
import decode from "jwt-decode";
import { AppBar, Typography, Toolbar, Button, Avatar} from '@material-ui/core';
import BrandLogo   from '../../Images/BrandLogo.png';
import useStyles  from "./Styles";

const avatarPlaceholder= "https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-avatar-icon-png-image_4017288.jpg"
const logoutIcon ="https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-logout-icon-png-image_4233257.jpg"


const NavBar = () => {
    const classes = useStyles();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    useLocation
    const logout = () => {
        dispatch({type: LOGOUT})

        navigate('/auth')
        
        setUser(null)
    };

//expiry token 
    useEffect(()=>{
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));

},[location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
            {!user && <Link to="/"><img className={classes.brandLogo} src={BrandLogo}/></Link>}
        </div>
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Link to="/"><Avatar className={classes.pruple} alt={user.result.name} src={user.result.picture || avatarPlaceholder}>
                        {user.result.name}                        
                    </Avatar></Link>
                    <Typography className={classes.userName} variant="h6">{user.result.name.split(" ")[0]}</Typography>
                    {user.result.role === "admin" && <Link to="/admin" style={{margin : 'auto 0'}}><Typography className={classes.userName} variant="h6">Users</Typography></Link>}
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout} ><Avatar src={logoutIcon}></Avatar></Button>
                </div>
            ) : (
                    <Link to="/auth"><Button variant="contained" color="primary">Sign In </Button></Link>
                )}
            </Toolbar>
    </AppBar>
  )
}

export default NavBar