import React, { useState } from 'react';
import { database, storage,account } from '../appwrite/config';
import { ID } from 'appwrite';
import { useNavigate } from 'react-router-dom';
import './CreateBlogForm.css';

const CreateBlogForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [theme, setTheme] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [blogResponse, setBlogResponse] = useState(null);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission
    const userSession = await account.getSession('current');
    console.log('User session:', userSession); 
    if(userSession){
    try {
 
      // Create image document
     
      const imageResponse = await storage.createFile('66d96daf0026a162f29f', ID.unique(), imageFile);
      const imageId = imageResponse.$id;

      // Create blog post document
      const response = await database.createDocument(
        '66d2f40e001bf295754d', // Replace with your database ID
        '66d2f423000882ea0241', // Replace with your collection ID
        ID.unique(),
        {
          title,
          author,
          content,
          theme,
  
          image: imageId, // Reference the image document ID
        }
      );
      setBlogResponse(response);
      navigate("/");
    }
   catch (error) {
      console.error('Error creating blog post:', error);
   
      navigate("/signup")
    }
  }
  else{
    alert("Not logged in. Please sign in to add the post.")
  }
  };

  return (
    <div >
      <h2>Create a New Blog Post</h2>
      
    <form  onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
  
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
  
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
  
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Theme:</label>
          <input
            type="text"
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          />
        </div>
  
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="file"
            onChange={handleImageChange}
          />
          {imageFile && <p>Selected file: {imageFile.name}</p>}
        </div>
  
        <button type="submit"  >Submit</button>
        </form>
      </div>
     
      

  );
}
export default CreateBlogForm