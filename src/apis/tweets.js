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
}