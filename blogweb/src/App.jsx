
import { BrowserRouter as Router } from 'react-router-dom';
import {Routes, Route} from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import AllPosts from './pages/AllPosts';
import Account from './pages/Account';
import CreateBlogForm from './pages/AddPost';
import DeletePost from './pages/DeletePost';
import Tech from './pages/Tech';
import Entertainment from './pages/Entertainment';
//import Searchexe from './pages/Searchexe'
import EditPost from './pages/EditPost'
import Home from './pages/Home';
import Post from './pages/Post';

import { useContext } from 'react';
import { ThemeContext } from './Context';
import "./index.css"
function App() {
 // const { theme,handleToggle } = useContext(ThemeContext);
  return (
   
<div>
  <Router>
  
    <Routes>

      <Route path='/signup/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/account' element={<Account />} />
      <Route path='/' element={

    <AllPosts />

} />


      <Route path='/post/:documentId' element={<Post/>}/>
      <Route path='/techposts/:documentId' element={<Tech/>}/>
      <Route path='/entertainmentposts/:documentId' element={<Entertainment/>}/>
      <Route path='/addPosts' element= {<CreateBlogForm/>}/>
      <Route path='/post/:documentId/editPosts/:documentId' element= {<EditPost/>}/> 
      <Route path='/post/:documentId/deletePosts/:documentId' element= {<DeletePost/>}/> 
      
    </Routes>
    </Router>
    </div>
    
  );
}

export default App;
