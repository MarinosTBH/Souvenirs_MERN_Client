import React ,{ useState } from 'react';
import { useDispatch } from "react-redux";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { AUTH } from '../../constants/actionTypes';
// import jwt_decode from 'jwt-decode';
import { useJwt, decodeToken } from 'react-jwt';
import { useNavigate } from "react-router-dom"; 

import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import useStyles from './Styles';
import Input from './Input';
import { signin, signup, googlesignin } from '../../actions/auth'

const initialState = { firstName : '', lastName : '', email : '', password : '', confirmPassword : ''};

const Auth = () => {
    const classes= useStyles();
    
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false) ;
    const [formData, setFormData] = useState(initialState) ;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowPassword =() => {
      setShowPassword((prevShowPassword) => !prevShowPassword)
    }
    //handleChange of submit fields
    const handleChange = (e) => {
      setFormData( { ...formData, [e.target.name] : e.target.value } )
    }
    //submit
    const handleSubmit = (e) => { 
      e.preventDefault();
      if (isSignUp) {
        dispatch(signup(formData, navigate))
      } else {
        dispatch(signin(formData, navigate))
      }
    }
    const switchMode = () => {
      setIsSignUp((prevIsSignUp) => !prevIsSignUp)
      setShowPassword(false);
    }
    const GoogleSuccess = async (res) => {
      // //optional chaining operator // do not throw error if you dont access res object // only undefined
      const token = (res.credential)
      const result = decodeToken(token);
      const googleData = {
        name : result.name,
        email: result.email,
        picture : result.picture
      }
      try {
        dispatch(googlesignin(googleData, navigate)) 

        // dispatch({type: AUTH, data: { result, token}})
        // navigate('/')
      } catch (error) {
        console.log(error)
      }
    }
    const GoogleFailure= (error) => {
      console.log(error)
      console.log("Google Sign In was unsuccessful. Try again later")
    }
    
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}> 
            <LockOutlinedIcon/>
          </Avatar>
          <Typography variant="h5">{!isSignUp ? 'Sign Up' : 'Sign In' }</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange}  half/>
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
              )}
              <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
              <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
              { isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>

             <GoogleOAuthProvider
              clientId="220656778069-565pmts38fvh8no72i5frtes82rq0h1s.apps.googleusercontent.com"
              >
              <GoogleLogin
                    onSuccess={GoogleSuccess}
                    onError={GoogleFailure}
                    cookiePolicy="single_host_origin"
                    useOneTap 
                />
            </GoogleOAuthProvider> 

            <Grid container justifyContent="flex-end">
                <Grid item >
                  <Button onClick={switchMode}>
                    {isSignUp ? 'Already have an account? Sign In ' : "Don't have an account? Sign Up"}
                  </Button>
                </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  )
}

export default Auth


//hamma@hamma.com

// {
//   "name": "hamma hamma",
//   "email": "hamma@hamma.com",
//   "password": "$2a$12$WgXIPBziz0sPrbVKQgjY.e7DVjU/vk7TXWcNXRMErON6UqNp1E4MW",
//   "_id": "62bf33ec13724d1a660022da",
//   "__v": 0
// }