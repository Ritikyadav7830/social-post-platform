import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import  Home from "./Pages/Home.jsx"
import { AuthLayout, Login ,Signup } from "./Components/Index.js"
import AllPosts from "./Pages/AllPost.jsx"
import AddPost from "./Pages/AddPost.jsx"
import EditPost from "./Pages/EditPost.jsx"
import store from "./Store/Store.js"
import Post from "./Pages/Post.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
             path:"/post/:postId",
             element:(
                 <AuthLayout authentication>
                    {<Post />}
                 </AuthLayout>
             )
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:postId",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
    ],
},
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
        
             <RouterProvider router={router}/>
        
    </Provider>
  </StrictMode>,
)
