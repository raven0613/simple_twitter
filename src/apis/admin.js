import { apiHelper } from "../utils/helpers";
const getToken = () => {
    localStorage.getItem('token')
}

export default{
    getAdminTweets () {
        return apiHelper.get('/admin/tweets', {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    deleteAdminTweets ({id}) {
        return apiHelper.delete(`/admin/tweets/${id}`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
}