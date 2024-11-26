export const mutations = `#graphql
createPost(content: String! ):Post
updatePost(id: ID!, content: String): Post!
deletePost(id: ID!): String!
`
