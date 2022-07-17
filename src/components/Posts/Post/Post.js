import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import  { getUsers } from '../../../actions/users';
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

import { Card, CardActions, CardContent, CardMedia, Button, Typography, Avatar } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import useStyles from './Styles';



const Post = ({ post, setCurrentId }) => {
    
const avatarPlaceholder= "https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-avatar-icon-png-image_4017288.jpg"
    
    const classes = useStyles();
    const dispatch = useDispatch();
    
    const user = JSON.parse(localStorage.getItem('profile'));
    const users = useSelector((state)=>state.users)
    useEffect(() => {
        dispatch(getUsers())
    },[]) 
    const postUser = users.find((user)=> user.name === post.name)
    const Likes = () => {
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (user?.result?.sub || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };

    return(
        <Card  className={classes.card}>
            <CardMedia className = {classes.media} image={post?.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}  title={post.title}></CardMedia>
            <div className={classes.overlay}>
                <div style={{display : "flex", gap : "10px"}}>
                    <Link to="/">
                        <Avatar className={classes.pruple} alt={post?.name} src={postUser?.picture || avatarPlaceholder}>
                            {user?.result?.name}                        
                        </Avatar>
                    </Link>
                    <Typography variant="h6">{post.name.split(" ")[0]}</Typography>
                </div>                
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
{/* edit */}
            {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator || user?.result?.role === "admin" ) && (
                <div className={classes.overlay2}>
                    <Button style={{color:'white'}} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="medium"/></Button>
                </div>
            )}
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag)=> `#${tag} `)}</Typography>
            </div>
            <div className={classes.details}>
                <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            </div>
            <CardContent className={classes.boxMessage}>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.message} gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled ={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                    <Likes/>
                </Button>
{/* delete */}
                {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator || user?.result?.role === "admin") && 
                <Button size="small" color="primary" onClick={() => 
                        dispatch(deletePost(post._id))
                    //    ( post.creator === 'Ali' || post.creator === 'Mohamed Terbah' || post.creator === 'farah' || post.creator === 'KJ')  ?  alert('Cannot delete this event!') : dispatch(deletePost(post._id))
                    }>
                    <DeleteIcon fontSize="small"/>
                    Delete
                </Button>}
                
            </CardActions>
        </Card>
    )
}

export default Post;