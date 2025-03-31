import axios from 'axios';

    //we can create  a base url 
const API = axios.create( {baseURL: process.env.BASE_URL });

// const API = axios.create( {baseURL: 'https://souvenirsappproject.herokuapp.com/' });
// const url =  'https://souvenirss.herokuapp.com/posts';

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

//posts
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

//auth
export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
export const googleSignIn = (formData) => API.post('/users/signupg', formData)
//users
export const getUsers = () => API.get('/users'); //FETCH_all
export const deleteUser = (id) => API.delete(`/users/${id}`)
export const blockUser = (id) => API.patch(`/users/blockuser/${id}`)
// BLOCK_USER

