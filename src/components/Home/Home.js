import React, {useState, useEffect} from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import{ Container, Grow, Grid, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts' ;

import useStyles  from "../../styles";

const Home = () => {
    const classes = useStyles();
    
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();

    const userLocal = JSON.parse(localStorage.getItem('profile'))

    useEffect(()=>{
        dispatch(getPosts());
    },[currentId, dispatch]);
  return (
    !userLocal?.result?.active  && userLocal? <Container><Typography variant="h2" className={classes.warningBanned}>you are banned! Go to contact</Typography></Container>
     :  
    <Grow in> 
        <Container >
        <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid  item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
        </Grid>
        </Container>
    </Grow>
  )
}

export default Home