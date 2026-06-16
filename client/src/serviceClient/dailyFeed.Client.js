import axios from 'axios';
import { createClient } from '../utils/clientConfig';

const baseURL = 'http://localhost:5000'; //ONLY FOR DEV BUILD

const dailyFeedClient = createClient(baseURL);

export default dailyFeedClient;