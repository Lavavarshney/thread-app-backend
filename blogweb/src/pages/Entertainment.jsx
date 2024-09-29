import React, { useState, useEffect } from "react";
import { database, storage } from '../appwrite/config'
import Cards from "./Cards";
import { Query } from "appwrite";

function Entertainment() {
  const [posts, setPosts] = useState([]); // Initialize posts as an empty array

  useEffect(() => {
    const fetchDocuments = async () => {
      const documents = await database.listDocuments('66d2f40e001bf295754d', '66d2f423000882ea0241', [
        Query.equal('theme', 'Entertainment')
      ]);
      setPosts(documents.documents); // Set posts to the array of documents
 
         
    };

    fetchDocuments();
  }, []);
  const getImageUrl = (imageId) => {
    // Construct the full URL using your Appwrite endpoint and project ID
    // Replace 'YOUR_APPWRITE_ENDPOINT' and 'YOUR_PROJECT_ID' with your actual values
    return `https://cloud.appwrite.io/v1/storage/buckets/66d96daf0026a162f29f/files/${imageId}/view?project=66d2f3bf00031aee8506`;
  };

  return (
    <>
      <h1>Welcome to Entertainment Blogs</h1>
      <div className="row"> {/* Wrap cards in a row for horizontal display */}
        
        {posts.map((post) => ( // Loop through the posts array
          <div key={post.$id} className="col-md-4"> {/* Each card in a 4-column grid */}
          
            <Cards 
              title={post.title} 
              img={getImageUrl(post.image)} 
              author={post.author} 
              theme={post.theme} 
              
              fullBlogLink={`./post/${post.$id}`}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Entertainment;