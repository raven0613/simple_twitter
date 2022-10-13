<template>
    <div class="recommend__panel">
        <h4>推薦跟隨</h4>
        <div class="recommend__container">

            <router-link :to="{ name: 'user-detail', params: {id: user.id}, query: {tab: 'tweet'}}" v-for="user in users" :key="user.id" class="recommend__user">
                <div class="recommend__user--avatar">
                    <img :src="user.profilePhoto" alt="">
                </div>
                <div class="recommend__user--info">
                    <p>{{user.name}}</p>
                    <span>@{{user.account}}</span>
                </div>

                <button @click.stop.prevent="addFollowship(user.id)" v-if="!user.isFollowed" class="prim-button prim-button__unfollowed">跟隨</button>
                <button @click.stop.prevent="deleteFollowship(user.id)" v-else class="prim-button prim-button__followed">正在跟隨</button>
            </router-link>

        </div>
    </div>
</template>

<script>
import followshipsAPI from '../apis/followships.js'
import { Toast } from '../utils/helpers.js'
import { mapState } from 'vuex'

export default {
    data () {
        return {
            users: []
        }
    },
    created () {
        this.fecthTopUsers()
    },
    computed: {
        ...mapState(['currentUser', 'isAuthenticated'])
    },
    methods: {
        async fecthTopUsers () {
            try {
                const { data } = await followshipsAPI.getTopUsers()
                this.users = data.filter(data => data.id !== this.currentUser.id).slice(0, 10)
            }
            catch (error) {
                console.log(error)
                Toast.fire ({
                    icon: 'error',
                    title: '無法取得推薦使用者，請稍後再試'
                })
            }
        },
        async addFollowship (id) {
            try{
                const response = await followshipsAPI.addFollowship({id})
                console.log(response)

                if (response.status !==  200) {
                    throw new Error(response.data.message)
                }
                this.users = this.users.map(user => {
                    if(user.id === id) {
                        return {
                            ...user,
                            'isFollowed' : true
                        }
                    }
                    return user
                })
                this.$emit('after-like-user', this.users)
            }
            catch(error) {
                const message = error.response.data.message
                console.log(message)
                return Toast.fire({
                    icon: 'error',
                    title: message
                })
            }

        },
        async deleteFollowship (followingId) {
            try{
                const response = await followshipsAPI.deleteFollowship({followingId})

                if (response.status !==  200) {
                    throw new Error(response.data.message)
                }

                this.users = this.users.map(user => {
                    if(user.id === followingId) {
                        return {
                            ...user,
                            'isFollowed' : false
                        }
                    }
                    return user
                })
            }
            catch(error) {
                const message = error.response.data.message
                console.log(message)
                return Toast.fire({
                    icon: 'error',
                    title: message
                })
            }
        },
    }
}
</script>