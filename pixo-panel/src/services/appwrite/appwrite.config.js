import {
  Client,
  Databases,
  TablesDB,
  Storage,
  Account,
  ID,
  Query,
  Functions,
} from "appwrite";
import { END_POINT, PROJECT_ID } from ".";

const client = new Client();
client.setEndpoint(END_POINT).setProject(PROJECT_ID);

const storage = new Storage(client);
const account = new Account(client);
const database = new Databases(client);
const tables = new TablesDB(client);
const functions = new Functions(client);

export { account, database, tables, storage, functions, ID, Query };
