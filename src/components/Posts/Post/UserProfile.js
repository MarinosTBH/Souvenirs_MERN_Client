import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getUsers, deleteUser } from '../../../actions/users';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import UndoIcon from "@material-ui/icons/Undo";

import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { LOGOUT } from '../../../constants/actionTypes';
import { pink } from '@material-ui/core/colors';

const UserProfile = () => {
    const {id} = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [userLocal, setUserLocal] = useState(JSON.parse(localStorage.getItem('profile')));
    const users = useSelector((state) => state.users)
    const userInfo = users.find(user=>user._id === id)

    useEffect(() => {
        dispatch(getUsers())
    },[dispatch]) 

    const logout = () => {
        dispatch({type: LOGOUT})
        navigate('/auth')
        setUserLocal(null)
    };

  return (<>
    <Link to='/'>
        <UndoIcon fontSize="large" sx={{ color: pink[500] }}></UndoIcon>
    </Link>
    <Card className='scrollCont' key ={userInfo?._id} sx={{ maxWidth: 345 }}>
        <img width={200} aria-label="recipe" src={userInfo?.picture} />
        {userInfo?._id === userLocal?.result?._id &&<Button variant="outlined" color="primary" onClick={ () => dispatch(updatePicture(userInfo._id))}>Change picture </Button>}
    <CardContent>
        <Typography variant="body2" color="text.secondary">{userInfo?.name}</Typography>
        {userInfo?._id === userLocal?.result?._id &&
        <Typography variant="body2" color="text.secondary">{userInfo?.email}</Typography>}
        <Typography variant="body2" color="text.secondary">{userInfo?.role}</Typography>
    </CardContent>
    <CardActions disableSpacing>
      {userInfo?._id === userLocal?.result?._id &&(<>
        <Button variant="outlined" color="secondary" onClick={ () =>{
            dispatch(deleteUser(userInfo?._id))
            logout()
        }}>
            Delete my account ?
        </Button>
        </>)}
    </CardActions>
</Card>
</>
  )
}

export default UserProfile