import { Client, Databases, Storage, Query, ID } from "appwrite";
import { END_POINT, PROJECT_ID } from ".";

const client = new Client();
client.setEndpoint(END_POINT).setProject(PROJECT_ID);

const storage = new Storage(client);
const database = new Databases(client);

export { database, storage, Query, ID };
