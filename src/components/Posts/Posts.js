import React from "react";
import Post from './Post/Post'
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from "@material-ui/core";
import useStyles from "./Styles"; 
// import  "./StylesCSS.css"; 

const Posts = ({ setCurrentId }) =>{
    // const classes = useStyles();
    const posts = useSelector((state)=>state.posts);

    return(
        !posts.length ? 
            <><CircularProgress /> <h2 className="emptyWarn" style={{color:"whitesmoke"}}>No posts ? Wait a moment</h2></> 
        : 
            (
                <Grid className="container" container alignItems="stretch" spacing={3}>
                    {posts.map((post) => (
                        <Grid key={post._id} item xs={12} sm={6}>
                            <Post post={post} setCurrentId={setCurrentId}/>
                        </Grid>))}
                        
                </Grid>
            )
    )
}

    {/* in : (Grow) to make it visible */}  {/* container (Grid) , to make it as a contain"er and gets props  */}
export default Posts;