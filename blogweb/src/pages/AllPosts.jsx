import React, { useState, useEffect } from 'react';
import { client,database, storage } from '../appwrite/config';
import { useNavigate } from 'react-router-dom';
import Cards from './Cards'; // Assuming you have a Cards component

function AllPosts()
{
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input,setInput]=useState("");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await database.listDocuments("66d2f40e001bf295754d", '66d2f423000882ea0241');
        const documents = response.documents;

        const promises = documents.map(async (document) => {
          const imageId = document.image;
          const imageUrlResponse = storage.getFileView("66d96daf0026a162f29f", imageId);
          const imageUrl = imageUrlResponse.href;
          return { ...document, image: imageUrl };
        });
       

        const resolvedDocuments = await Promise.all(promises);
        setNewsData(resolvedDocuments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
     
    };

    fetchDocuments();
  }, []);

  const search = () => {
    const foundItem = newsData.filter((news) =>
      news.title.toLowerCase().includes(input.toLowerCase()) ||
      news.author.toLowerCase().includes(input.toLowerCase())|| 
      news.theme.toLowerCase().includes(input.toLowerCase())
    );
  
    if (foundItem) {
      console.log("Item found:", foundItem);
      return foundItem; // You can return this or use it further in your logic
    } else {
      console.log("No items found");
      return null; // Return null if no match is found
    }
  };

const handleSearch=(e)=>{
setInput(e.target.value);
  }
 

 /* const handleClick = (documentId) => {
    navigate(`./post/${documentId}`);
  };*/

   return (
   
    <div>
    <h1>Top Headlines</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={input}
        onChange={handleSearch} // Event listener for input change
      />
 
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {search().map((article) => (
             
            <div className="col-md-4" key={article.$id}>
           
              <Cards 
                title={article.title} 
                img={article.image} 
                author={article.author} 
                theme={article.theme} 
                id={article.$id}
            
               
                relatedPostsLink={article.theme === 'Tech' ? `./techposts/${article.$id}` : article.theme === 'Entertainment' ? `./entertainmentposts/${article.$id}` : null}
                fullBlogLink={`./post/${article.$id}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
 
  );
}


export default AllPosts;
