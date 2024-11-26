export const typeDefs = `#graphql
type Post{
id: ID!
content: String!
authorId: String!
}

type Subscription{
  newPost: Post
  updatedPost: Post
  deletedPost: ID
}
`;
