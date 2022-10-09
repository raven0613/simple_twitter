<template>
    <div class="recommend__panel">
        <h4>推薦跟隨</h4>
        <div class="recommend__container">

            <router-link :to="{ name: 'user-detail', params: {id: user.id} }" v-for="user in users" :key="user.id" class="recommend__user">
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

export default {
    data () {
        return {
            users: []
        }
    },
    created () {
        this.fecthTopUsers()
    },
    methods: {
        async fecthTopUsers () {
            try {
                const ROOT_ID = 4
                const { data } = await followshipsAPI.getTopUsers()
                this.users = data.filter(data => data.id !== ROOT_ID)
            }
            catch (error) {
                console.log(error)
                Toast.fire ({
                    icon: 'error',
                    title: '無法取得推薦使用者，請稍後再試'
                })
            }
        },
        async addFollowship (userId) {
            try{
                const { data } = await followshipsAPI.addFollowship()
                console.log(data)
                this.users = this.users.map(user => {
                    if(user.id === userId) {
                        return {
                            ...user,
                            'isFollowed' : true
                        }
                    }
                    return user
                })
            }
            catch(error) {
                console.log(error.message)
                return Toast.fire({
                    icon: 'error',
                    title: '目前無法追蹤該使用者，請稍後再試'
                })
            }

        },
        async deleteFollowship (userId) {
            try{
                const { data } = await followshipsAPI.deleteFollowship(userId)
                console.log(data)

                this.users = this.users.map(user => {
                    if(user.id === userId) {
                        return {
                            ...user,
                            'isFollowed' : false
                        }
                    }
                    return user
                })
            }
            catch(error) {
                console.log(error.message)
                return Toast.fire({
                    icon: 'error',
                    title: '目前無法取消追蹤該使用者，請稍後再試'
                })
            }
        },
    }
}
</script>