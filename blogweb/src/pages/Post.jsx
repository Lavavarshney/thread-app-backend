import React, { useState, useEffect} from "react";
import { ID } from "appwrite";
import { database,storage } from "../appwrite/config";
import { useParams,useNavigate } from "react-router-dom";
import "./post.css"
import { useContext } from "react";
import {ThemeContext} from '../Context'
import Comments from "./Comments";
function Post()
{
  //const {theme} =useContext(ThemeContext);
 
    const {documentId} =useParams();
    {console.log(documentId)}
    const navigate=useNavigate();
    const [post, setPost] = useState('');
    const [imageUrl, setImageUrl] = useState(''); // Add a new state for image URL
    useEffect(() => {
        const fetchDocument = async () => {
          await database.getDocument("66d2f40e001bf295754d", 
            "66d2f423000882ea0241", documentId).then((post) => {
            setPost(post)})
            .catch((error) => {
                console.error('Error getting document:', error);
              });
          }
        fetchDocument()
    },[documentId])
 
    const handleEdit = (documentId) => {
        navigate(`./editPosts/${documentId}`);
      }
    
      const handleDelete = (documentId) => {
        // Delete logic here
        navigate(`./deletePosts/${documentId}`);
      }
    const getImageUrl = async(imageId) => {
        // Construct the full URL using your Appwrite endpoint and project ID
        // Replace 'YOUR_APPWRITE_ENDPOINT' and 'YOUR_PROJECT_ID' with your actual values
        
    const result = await  storage.getFileView('66d96daf0026a162f29f', imageId);
    
    console.log('Result',result); 
  
    return (result.href)
  
       
      };
      useEffect(() => {
        if (post.image) {
          getImageUrl(post.image).then((url) => {
            setImageUrl(url); // Update the image URL state
            {console.log ("post",post.image)} 
            
          });
        }
      }, [post.image]);
      {console.log ("url", imageUrl)} 

      return (
        <div className="container">
          <div className="card">
            <img src={imageUrl}  alt="..."/>
            <div className="card-body" >
              <h5 className="card-title">{post.title}</h5>
              <h6 className="card-text">
                <b>Author: </b> {post.author} <br/>
                <b>Theme: </b> {post.theme}
                {
                  post.content && (
                    <p>Content: {post.content}</p>
                  )
                }
              </h6>
              <div className="d-flex justify-content-between">
                {/* Add buttons here */}
                <button onClick={() => handleEdit(post.$id)}>Edit</button>
                <button onClick={() => handleDelete(post.$id)}>Delete</button>
              </div>
            </div>
          </div>
         <Comments/>
 
 </div> 
);
};
export default Post;