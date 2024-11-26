import { prismaClient } from "../lib/db";
import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();
export interface CreatePostPayload {
  content: string;
  authorId: string; // Include the author's ID in the payload
}
export interface UpdatePostPayload {
  id: string;        // The ID of the post to update
  content?: string;  // Optional: New content for the post
}

class PostService {
  public static async createPost(payload: CreatePostPayload) {
    const { content, authorId } = payload;
   
    const newPost = await prismaClient.post.create({
      data: {
        content,
        createdAt: new Date().toISOString(),
        author: {
          connect: { id: authorId }  // Connect the current logged-in user as the author
        }
      },
    });
   

    return newPost;
  }
  public static getPostById(id: string) {
    return prismaClient.post.findUnique({ where: { id } });
  }
  public static async updatePost(payload: UpdatePostPayload) {
    const { id, content } = payload;
    console.log(payload);
    return await prismaClient.post.update({
      where: { id },      // Specify the post to update
      data: { content },  // Fields to update
    });
       
  }
  public static async deletePost(id: string)
  {
   return  prismaClient.post.delete({ where: { id } });
  
  }
}

export default PostService;
