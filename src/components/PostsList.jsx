import { useState } from 'react';
import NewPost from './NewPost';
import Post from './Post';
import classes from './PostsList.module.css';
import Modal from './Modal';
import { CiTextAlignCenter } from 'react-icons/ci';


function PostsList({isPosting, onStopPosting}){
    const [posts, setPosts] = useState([]);
    
    function addPostHandler(postData){
        fetch('http://localhost:8080', {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    

        setPosts((exitingPosts) => [postData, ...exitingPosts]); //update state auto

    }
    return (
        <>
        {isPosting && (
            <Modal onClose={onStopPosting}>
                <NewPost onCancel = {onStopPosting} onAddPost={addPostHandler}/>
            </Modal>

        )}
        {posts.length > 0 && (
            <ul className={classes.posts}> 
                {posts.map((post) => (<Post key={post.body} author={post.author} body={post.body}/>
            ))} 
            </ul>
        )}
            {posts.length === 0 && ( 
                <div style={{textAlign: 'center', color: 'white'} }>
                    <h2>There are no posts yet.</h2>
                    <p>Start adding some!</p>
            </div>
            )}
        </>
    );
}

export default PostsList;