<template>
    <div class="recommend__panel">
        <h4>推薦跟隨</h4>
        <div class="recommend__container">

            <router-link :to="{ name: 'user-detail', params: {id: user.id}, query: {tab: 'tweet'}}" v-for="user in users" :key="user.id" class="recommend__user">
            <!-- 個人資訊區 -->
                <div class="recommend__user--avatar">
                    <img :src="user.profilePhoto | emptyImage" alt="">
                </div>
                <div class="recommend__user--info">
                    <p>{{user.name}}</p>
                    <span>@{{user.account}}</span>
                </div>
            <!-- 按鈕區 -->
                <button 
                @click.stop.prevent="addFollowship(user.id)" 
                v-if="!user.isFollowed" 
                class="primbutton primbutton__unfollowed" :class="{primbutton__unfollowed_processing: user.isProcessing}">跟隨</button>
                <button 
                @click.stop.prevent="deleteFollowship(user.id)" v-else 
                class="primbutton primbutton__followed" :class="{primbutton__followed_processing: user.isProcessing}">正在跟隨</button>
            </router-link>

        </div>
    </div>
</template>

<script>
import followshipsAPI from '../apis/followships.js'
import { Toast, innerHtml } from '../utils/helpers.js'
import { emptyImageFilter } from '../utils/mixins.js'
import { mapState } from 'vuex'

export default {
    mixins:[emptyImageFilter],
    data () {
        return {
            users: [],
        }
    },
    created () {
        this.fecthTopUsers()
    },
    computed: {
        ...mapState(['currentUser', 'isAuthenticated']),
    },
    methods: {
        async fecthTopUsers () {
            try {
                const { data } = await followshipsAPI.getTopUsers()
                this.users = data
                .filter(data => data.id !== this.currentUser.id).slice(0, 10)
                .map((user) => {
                    return {
                        ...user, isProcessing: false
                    }
                })
            }
            catch (error) {
                console.log(error)
                Toast.fire ({
                    html: innerHtml('目前無法推薦使用者，請稍後再試','error')
                })
            }
        },
        async addFollowship (id) {
            try{
                //該user的請求處理中就return
                if (this.checkProcessing (id)) return
                //將該user變成處理中
                this.changeIsProcessing (id)
                
                const response = await followshipsAPI.addFollowship({id})

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
                this.changeIsProcessing (id)
            }
            catch(error) {
                const message = error.response.data.message
                this.changeIsProcessing (id)
                console.log(message)
                return Toast.fire({
                    html: innerHtml(message,'error')
                })
            }

        },
        async deleteFollowship (followingId) {
            try{
                if (this.checkProcessing (followingId)) return
                this.changeIsProcessing (followingId)

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
                this.changeIsProcessing (followingId)
            }
            catch(error) {
                const message = error.response.data.message
                this.changeIsProcessing (followingId)
                console.log(message)
                return Toast.fire({
                    html: innerHtml(message,'error')
                })
            }
        },
        //切換選中user的isProcessing
        changeIsProcessing (userId) {
            this.users = this.users.map(user => {
                if (userId === user.id) {
                    return { ...user, isProcessing: !user.isProcessing }
                }
                return { ...user }
            })
        },
        //確認選中user是否isProcessing
        checkProcessing (userId) {
            const clickedUser = this.users.find(user => user.id === userId)
            if (clickedUser.isProcessing) return true
            return false
        }
    }   
}
</script>