import { apiHelper } from "../utils/helpers";
const getToken = () => {
    localStorage.getItem('token')
}

export default{
    getTopUsers () {
        return apiHelper.get('/followships/top', {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    addFollowship () {
        return apiHelper.post('/followships', null, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    deleteFollowship ({followingId}) {
        return apiHelper.delete(`/followships/${followingId}`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
}