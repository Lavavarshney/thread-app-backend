import React, { useEffect, useState } from "react";
import { database, account } from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function DeletePost() {
  const [acc, setAcc] = useState({});
  const [author, setAuthor] = useState('');
  const [documentId, setDocumentId] = useState('');
  const navigate = useNavigate();
  const { documentId: urlDocumentId } = useParams();

  useEffect(() => {
    setDocumentId(urlDocumentId);
  }, [urlDocumentId]);

  const person = async () => {
    const result = await account.get();
    setAcc(result);
  };

  useEffect(() => {
    person();
  }, []);

  const getDocument = async () => {
    const response = await database.getDocument("66d2f40e001bf295754d", '66d2f423000882ea0241', documentId);
    console.log('getDocument response:', response);

    if (response.author) {
      setAuthor(response.author);
    } else {
      console.error('Error: response.author is undefined');
    }
  };

  useEffect(() => {
    getDocument();
    
  }, [documentId]);

  const delDocument = async () => {
    if (author.toLowerCase() === acc.name.toLowerCase()) {
      try {
        await database.deleteDocument("66d2f40e001bf295754d", "66d2f423000882ea0241", documentId);
        console.log('hello2');
        navigate("/allposts");
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    } else {
      alert("You do not have an active session");
      navigate("/signup");
    }
  };

  useEffect(() => {
    if (acc.name && author) {
      delDocument();
    }
  }, [acc, author]);

 
}

export default DeletePost;