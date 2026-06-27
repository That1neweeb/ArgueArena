import dailyFeedClient from "../serviceClient/dailyFeed.Client";

export const getTopic = async() => {
    const res = await dailyFeedClient.get('/api/forums/getTopic');
    // console.log(res.message);
    return res.data;
}
export const getMessages = async (topicId) => {
    const res = await dailyFeedClient.get(`/api/forums/${topicId}/messages`)
    return res.data;
}