// EditPost.js
import React, { useState, useEffect } from "react";
import { database, storage, account } from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateBlogForm.css"
import { ID } from "appwrite";
function EditPost() {
  
  const [acc,setAcc]= useState({});
  const navigate = useNavigate();
 
  const {documentId} = useParams();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [theme, setTheme] = useState('');
  const [newImage, setNewImage] = useState(null);
   const [currentImage, setCurrentImage] = useState(null); // To display the current image
   useEffect(() => {
    const fetchDocument = async () => {
      try {
      
  
          const response = await database.getDocument("66d2f40e001bf295754d", '66d2f423000882ea0241', documentId);
          const { title, author, content, theme, image } = response;
          setTitle(title);
          setAuthor(author);
          setContent(content);
          setTheme(theme);
          setCurrentImage(image);
        } 
        
      catch (error) {
        console.error('Error getting document:', error);
        if (error.code === 401) {
          alert("Not logged in. Please sign in to edit the post.");
          navigate("/login");
        } else {
          alert("Error getting document: " + error.message);
        }
      }
    };
  
    fetchDocument();
  }, [documentId]);
 
const person = async() => {
 const result = await account.get();
 setAcc(result);
console.log(author)
console.log(acc.name);

}
useEffect(()=>{
person();
},[acc])

        
 


  const handleSubmit = async (event) => {
    event.preventDefault();
  
      let newImageId;

      if (newImage) {
        const imageUploadResponse = await storage.createFile("66d96daf0026a162f29f", ID.unique(), newImage);
        newImageId = imageUploadResponse.$id;
      }

      const documentData = {
        title,
        author,
        content,
        theme,
        image: newImageId,
      };

      if (author.toLowerCase() === acc.name.toLowerCase()) {
        try {
          const response = await database.updateDocument(
            "66d2f40e001bf295754d",
            '66d2f423000882ea0241',
            documentId,
            documentData,
          );
    
          console.log(response);
          navigate("/");
        } catch (error) {
          alert("Error updating document: " + error.message);
        }
      } else {
        alert("You do not have an active session.");
        navigate("/signup")
      }
    
  }
  


  const handleImageChange = (event) => {
    setNewImage(event.target.files[0]);
  };
  
        

  return (
    <div className="hello">
      <form onSubmit={handleSubmit}>
      <h2>Edit Post</h2>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <br />
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
        <br />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <br />

    
        <label htmlFor="theme">Theme:</label>
        <input
          type="text"
          id="theme"
          value={theme}
          onChange={(event) => setTheme(event.target.value)}
        />
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
        />
        <br />
        <button type="submit">Update Post</button>
      </form>
    </div>

  );

}

export default EditPost;