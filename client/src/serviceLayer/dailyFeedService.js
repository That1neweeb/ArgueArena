import dailyFeedClient from "../serviceClient/dailyFeed.Client";

export const getTopic = async() => {
    const response = await dailyFeedClient.get('/forums')
}