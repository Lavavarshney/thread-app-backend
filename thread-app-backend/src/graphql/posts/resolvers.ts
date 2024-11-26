import PostService from "../../services/post";
import { PubSub } from 'graphql-subscriptions';
import { EventEmitter } from 'events';
// Create an instance of PubSub
const pubsub = new PubSub() as PubSub & { asyncIterator: (triggers: string | string[]) => AsyncIterator<any> };
console.log('PubSub instance:', pubsub); // Type assertion;
console.log('PubSub asyncIterator type:', typeof pubsub.asyncIterator);
console.log('EventEmitter:', EventEmitter);
const queries = {
  getCurrentPost: async (_: any, { id }: { id: string }) => {
    const post = await PostService.getPostById(id);
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  },
};

const mutations = {
  createPost: async (_: any, { content }: { content: string }, context: any) => {
    const authorId = context.user.id;  // Assuming the user ID is stored in context
    if (!authorId) {
      throw new Error("User  is not authenticated or authorId is missing");
    }

    const newPost = await PostService.createPost({ content, authorId });
    
    // Publish the new post event
    pubsub.publish("newPost", { newPost });

    return newPost;
  },

  updatePost: async (_: any, { id, content }: { id: string; content: string }) => {
    const existingPost = await PostService.getPostById(id);
    if (!existingPost) {
      throw new Error("Post not found");
    }

    const updatedPost = await PostService.updatePost({ id, content });

    // Publish the updated post event
    pubsub.publish("updatedPost", { updatedPost });

    return updatedPost;
  },

  deletePost: async (_: any, { id }: { id: string }) => {
    const existingPost = await PostService.getPostById(id);
    if (!existingPost) {
      throw new Error("Post not found");
    }

    await PostService.deletePost(id);

    // Publish the deleted post event
    pubsub.publish("deletedPost", { id });

    return "Post is deleted";
  }
};

// Subscription resolvers
const subscriptions = {
  newPost: {
    subscribe: () => pubsub.asyncIterator(["newPost"]),
  },
  updatedPost: {
    subscribe: () => pubsub.asyncIterator("updatedPost"),
  },
  deletedPost: {
    subscribe: () => pubsub.asyncIterator("deletedPost"),
  },
};

export const resolvers = { queries, mutations, subscriptions };