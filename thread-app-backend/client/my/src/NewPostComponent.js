import React from 'react';
import { useSubscription, gql } from '@apollo/client';

// Define your GraphQL subscription query
const NEW_POST_SUBSCRIPTION = gql`
  subscription {
    newPost {
      id
      content
      authorId
    }
  }
`;

const NewPostComponent = () => {
  // Subscribe to the newPost subscription
  const { data, loading, error } = useSubscription(NEW_POST_SUBSCRIPTION);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>New Post</h2>
      <p>{data.newPost.content}</p>
      <p>Author ID: {data.newPost.authorId}</p>
    </div>
  );
};

export default NewPostComponent;
