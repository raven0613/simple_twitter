import { apiHelper } from "../utils/helpers";
const getToken = () => {
    localStorage.getItem('token')
}

export default{
    getTweets () {
        return apiHelper.get('/tweets', {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    getTweet ({id}) {
        return apiHelper.get(`/tweets/${id}`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    getReplies ({id}) {
        return apiHelper.get(`/tweets/${id}/replies`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    addTweet ({description}) {
        return apiHelper.post('/tweets', {
            description
        } , null, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    addReply ({tweet_id, comment}) {
        return apiHelper.post(`/tweets/${tweet_id}/replies`, {
            comment
        } , null, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
}