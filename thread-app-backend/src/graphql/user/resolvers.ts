import UserService from "../../services/user";
import { CreateUserPayload } from "../../services/user";
const queries={
    getUserToken: async(_:any, payload:{email:string, password:string})=>{
        const token = await UserService.getUserToken({email: payload.email,password: payload.password})
       return token;  
    },

  getCurrentLoggedInUser: async(_:any, parameters:any, context:any) =>{
  if(context && context.user){
    const id = context.user.id
    console.log("user id",id);
    const user = await UserService.getUserById(id)
    return user;
  }
    throw new Error("dont know you");

},
  
};
const mutations = {
  createUser: async (
    _: any,
    payload: { firstName: string; lastName: string; email: string; password: string }
  ) => {
    try {
      const user = await UserService.createUser(payload);
      const { id, firstName, lastName, email } = user;
      return { id, firstName, lastName, email };  
    } catch (error: any) {
      console.error("Error creating user:", error.message);
      throw new Error(error.message || "Failed to create user.");
    }
  },
};



export const resolvers = {queries,mutations};
