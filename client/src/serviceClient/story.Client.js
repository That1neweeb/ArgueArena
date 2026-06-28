import { createClient } from "../utils/clientConfig";

const baseURL = "http://localhost:3002/api/story";
const storyClient = createClient(baseURL);

export default storyClient;
