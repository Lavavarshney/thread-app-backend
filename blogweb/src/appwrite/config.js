import {Client, Account, Databases, Storage} from "appwrite";

export const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject("66d2f3bf00031aee8506");


export const account = new Account(client);
export const database = new Databases(client, "66d2f40e001bf295754d");
export const storage = new Storage(client);



