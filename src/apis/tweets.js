import { apiHelper } from "../utils/helpers";

export default{
    getTweets () {
        return apiHelper.get('/tweets')
    },
    getTweet ({id}) {
        return apiHelper.get(`/tweets/${id}`)
    },
    getReplies ({id}) {
        return apiHelper.get(`/tweets/${id}/replies`)
    },
    addTweet ({description}) {
        return apiHelper.post('/tweets', {
            description
        })
    },
    addReply ({id, comment}) {
        return apiHelper.post(`/tweets/${id}/replies`, {
            comment
        })
    },
    addLike ({tweet_id}) {
        return apiHelper.post(`/tweets/${tweet_id}/like`, null)
    },
    deleteLike ({tweet_id}) {
        return apiHelper.post(`/tweets/${tweet_id}/unlike`)
    },
}