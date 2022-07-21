import React, { useEffect } from 'react';
import  { useDispatch, useSelector } from 'react-redux';
import  { getUsers } from '../../actions/users';
import  UserCard from './UserCard';
import { Link } from 'react-router-dom'
import { pink } from '@material-ui/core/colors';
import UndoIcon from "@material-ui/icons/Undo";


import './style.css'

const Admin = () => {
 
    const userLocal = JSON.parse(localStorage.getItem('profile'));

    const dispatch = useDispatch();

    const users = useSelector((state) => state.users)

    useEffect(() => {
        dispatch(getUsers())
    },[dispatch]) 


  return ( <>    
    <Link to='/'>
      <UndoIcon fontSize="large" sx={{ color: pink[500] }}></UndoIcon>
    </Link>
    {userLocal.result.role === "admin" ?
        <div className="scrollmenu">
                {users.map((user) => (
                    <UserCard key={user._id} user={user}/>
                ))}
        </div> : 
        <div>No content</div>
        }</>
        )
}

export default Admin