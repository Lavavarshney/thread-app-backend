import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { database } from "../appwrite/config";
import { ID } from "appwrite";
import './Comments.css'
function Comments() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);
  const { documentId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await database.createDocument(
      '66d2f40e001bf295754d', // Replace with your database ID
      '66e595fd00359430af90', // Replace with your collection ID
      ID.unique(),
      {
        'Name': name,
        'Content': content,
        'PostId': documentId
      }
    )
    setComments(response);
  }

  useEffect(() => {
    const fetchDocuments = async () => {
      const documents = await database.listDocuments('66d2f40e001bf295754d', '66e595fd00359430af90');
      setComments(documents.documents); // Set posts to the array of documents
    };

    fetchDocuments();
  }, []);

  console.log(comments);
  const commentsArray = Array.from(comments);

  console.log("type", typeof comments);
  console.log("typeArray", typeof commentsArray);
  console.log("isArray", Array.isArray(commentsArray));
  let selComm = commentsArray.filter((comment) => (comment.PostId) === documentId);
  console.log("type Selcomm", typeof selComm);
  { console.log("docId", documentId); };
  console.log("isSelcomm", Array.isArray(selComm));

  return (
    <div class="parent-container">
    <div className="comment-section">
      <h4>Comments</h4>
      <div className="comments-container">
        {selComm.map((comm) => (
          <div key={comm.$id} className="comment">
            <h6 className="comment-author">{comm.Name}</h6>
            <p className="comment-content">{comm.Content}</p>
          </div>
        ))}
      </div>
      <div className="comment-form">
        <h5>Leave a comment</h5>
        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            id="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea
            id="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
    </div>
  );
}

export default Comments;