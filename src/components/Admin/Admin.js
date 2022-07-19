import React, { useEffect } from 'react';
import  { useDispatch, useSelector } from 'react-redux';
import  { getUsers } from '../../actions/users';
import  UserCard from './UserCard';


import './style.css'

const Admin = () => {
 
    const userLocal = JSON.parse(localStorage.getItem('profile'));

    const dispatch = useDispatch();

    const users = useSelector((state) => state.users)

    useEffect(() => {
        dispatch(getUsers())
    },[dispatch]) 


  return ( 
    userLocal.result.role === "admin" ?
        <div className="scrollmenu">
                {users.map((user) => (
                    <UserCard key={user._id} user={user}/>
                ))}
        </div> : 
        <div>No content</div>
  )
}

export default Admin