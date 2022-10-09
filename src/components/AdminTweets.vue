<template>
    <router-link :to="{ name: 'tweet-detail', params: {id: tweet.id}}" class="admin-tweet__container tweet__container">

        <div class="tweet__avatar">
            <img class="tweet__avatar--photo" :src="tweet.User.profilePhoto" alt="">
        </div>

        <div class="tweet__info">
            <form action="" class="tweet__top">
                <div class="tweet__top--info">
                    <span class="tweet__top--prim">{{tweet.User.name}}</span>
                    <span class="tweet__top--sec">@{{ tweet.User.account }}</span>
                    <span class="tweet__top--sec">．{{ tweet.createdAt }}</span>
                </div>
                <button @click.stop.prevent="adminDeleteTweet(tweet.id)" type="button" class="tweet__delete">
                    <img src="../assets/images/cancel-gray.svg" alt="">
                </button>
            </form>
            <div class="tweet__info--content">
                {{ tweet.description }}
            </div>
        </div>
    </router-link>
</template>

<script>
import { Toast } from '../utils/helpers'
import adminAPI from '../apis/admin.js'

export default {
    props: {
        initialTweet: {
            type: Object,
        }
    },
    data() {
        return {
            tweet: this.initialTweet
        }
    },
    methods: {
        //優化：跳出提醒視窗
        async adminDeleteTweet (id) {
            try {
                const response = await adminAPI.deleteAdminTweets({id})
                console.log(response)
                if(response.data.status === 'error') throw new Error(response.data.message)
                this.$emit("after-delete-tweet", id)
            }
            catch (error) {
                console.log(error.response.data.message)
                return Toast.fire({
                    icon: 'error',
                    title: '目前無法刪除推文，請稍後再試'
                })
            }
        }
    }
}
</script>