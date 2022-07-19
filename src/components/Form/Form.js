import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./Styles";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";


const Form = ( {currentId, setCurrentId} ) =>{
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    const [postData, setPostData] = useState({title : '', message : '', tags : '', selectedFile : ''});
    const [formTemplate, setFormTemplate] = useState(false);
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);  
    const dispatch = useDispatch();

    //handle show add 
    const addPost = () => {
        setFormTemplate(true)
    }

    //use effect data posts
    useEffect(() => {
        if (post) setPostData(post);
    }, [post]); //when should callbakc func rerender 
    
    //use effect edit form
    useEffect(() => {
        if (currentId && postData) {
            setFormTemplate(true)
            window.scrollTo(0,0);
        }
    },[post])

    const handleSubmit= (e) =>{
        e.preventDefault();

        if (!postData.title) {
            alert("Fill the form!")
        }else {
            if(!currentId ) {
                dispatch(createPost({ ...postData, name: user?.result?.name}));
                clear();
                
            } else {
                dispatch(updatePost(currentId, postData));
                clear();
            }
        }
        clear();
    };

    if(!user?.result?.name) {
        return (<Paper  className={classes.paper}>
            <Typography >
                Please Sign in to create your own souvenirs and like other's souvenirs
            </Typography>
        </Paper>)
    }

    const clear =()=>{
        currentId = null;
        setPostData({title : '', message : '', tags : '', selectedFile : ''});
    }


    return(
        formTemplate ? 
        <>
            <Paper className={classes.paper}>
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography variant="h6">{!currentId ? 'Creating' : 'Editing' } a Souvenir</Typography>
                    {/* <TextField  name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} 
                    //We store our value in here, in the state postData object and : each object key (.creator) is going to be a specific text field  onChange={(e)=> setPostData({...postData, creator : e.target.value})} // Spread and only change the last property for other textfields
                    /> */}
                    <TextField name="title" variant="outlined" label="title" fullWidth value={postData.title} onChange={(e)=> setPostData({...postData, title : e.target.value})} />
                    <TextField name="message" variant="outlined" label="message" fullWidth value={postData.message}  onChange={(e)=> setPostData({...postData, message : e.target.value})} />
                    <TextField  name="tags"  variant="outlined"  label="tags"  fullWidth  value={postData.tags} onChange={(e)=> setPostData({...postData, tags : e.target.value.split(',')})} />
                    <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({base64})=> setPostData({...postData, selectedFile : base64})} /></div>  {/* Conevert img to txt */}
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                </form>
            </Paper>
        </> 
        : <Button className={classes.showAdd} variant="contained" color="primary" onClick={addPost}>Add</Button>
        
    )
}

export default Form;