<template>
    <router-link 
    :to="{ name: 'user-detail', params: {id: user.id}, query: {tab: 'tweet'}}" 
    class="follow-user">

        <div class="tweet__avatar">
            <img class="tweet__avatar--photo" :src="user.profilePhoto" alt="">
        </div>

        <div class="tweet__info">
            <div class="follow-user__info">
                <span>{{ user.name }}</span>
            <!-- 按鈕區 -->
                <button 
                @click.stop.prevent="addFollowship(user.id)" 
                v-if="!user.isFollowed" 
                class="primbutton primbutton__unfollowed" :class="{primbutton__unfollowed_processing: isProcessing}">跟隨</button>
                <button 
                @click.stop.prevent="deleteFollowship(user.id)" v-else 
                class="primbutton primbutton__followed" :class="{primbutton__followed_processing: isProcessing}">正在跟隨</button>
            </div>
            <div class="follow-user__description">
                {{ user.introduction }}
            </div>
        </div>
    </router-link>
</template>

<script>
import followshipsAPI from '../apis/followships.js'
import { Toast } from '../utils/helpers.js'

export default {
    props: {
        initFollower: {
            type: Object
        }
    },
    data() {
        return {
            user: this.initFollower,
            isProcessing: false
        }
    },
    watch: {
        initFollower (newValue) {
            this.user = {
                ...this.user,
                ...newValue
            }
        }
    },
    methods: {
        async addFollowship (id) {
            try{
                if (this.isProcessing) return
                this.isProcessing = true

                const response = await followshipsAPI.addFollowship({id})
                console.log(response)

                if (response.status !==  200) {
                    throw new Error(response.data.message)
                }
                this.user = {
                    ...this.user,
                    isFollowed: true
                }
                this.$emit('after-like-user', this.user)
                this.isProcessing = false
            }
            catch(error) {
                const message = error.response.data.message
                this.isProcessing = false
                console.log(message)
                return Toast.fire({
                    icon: 'error',
                    title: message
                })
            }

        },
        async deleteFollowship (followingId) {
            try{
                if (this.isProcessing) return
                this.isProcessing = true

                const response = await followshipsAPI.deleteFollowship({followingId})
                if (response.status !==  200) {
                    throw new Error(response.data.message)
                }
                this.user = {
                    ...this.user,
                    isFollowed: false
                }
                this.$emit('after-like-user', this.user)
                this.isProcessing = false
            }
            catch(error) {
                const message = error.response.data.message
                this.isProcessing = false
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