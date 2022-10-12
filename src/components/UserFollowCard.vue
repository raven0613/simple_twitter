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
                <button @click.stop.prevent="addFollowship(user.id)" v-if="!user.isFollowed" class="prim-button prim-button__unfollowed">跟隨</button>
                <button @click.stop.prevent="deleteFollowship(user.id)" v-else class="prim-button prim-button__followed">正在跟隨</button>
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
// import { mapState } from 'vuex'

export default {
    props: {
        initFollower: {
            type: Object
        }
    },
    data() {
        return {
            user: this.initFollower
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
                const { data } = await followshipsAPI.deleteFollowship({followingId})
                console.log(data)

                this.user = {
                    ...this.user,
                    isFollowed: true
                }
                this.$emit('after-like-user', this.user)
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