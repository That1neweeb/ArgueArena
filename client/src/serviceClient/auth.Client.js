import axios from 'axios';
import { createClient } from '../utils/clientConfig';

const baseURL = 'http://localhost:3001'; //ONLY FOR DEV BUILD

const authClient = createClient(baseURL);

export default authClient;