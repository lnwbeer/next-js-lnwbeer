import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // Use createRoot from react-dom/client
import './index.css';
import Posts, { loader as postsLoader} from './routes/Posts.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './routes/RootLayout.jsx';
import NewPost, { action as newPostAction} from './routes/NewPost.jsx';
import PostDetails, {loader as postDetailsLoader} from './routes/PostDetails.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { 
        path: '/', 
        element: <Posts />, 
        loader: postsLoader,
        children:[
          { path: '/create-post', element: <NewPost />, action: newPostAction },
          { path: '/:postId', element: <PostDetails/>, loader: postDetailsLoader}
        ],  
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render( // Fixed typo here
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
