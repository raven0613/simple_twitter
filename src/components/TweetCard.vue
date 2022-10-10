<template>
    <router-link :to="{ name: 'tweet-detail', params: { id: tweet.id } }" class="tweet__container">

        <div class="tweet__avatar">
            <router-link :to="{name: 'user-detail', params: {id: tweet.UserId}}" class="tweet__avatar--photo" >
                <img :src="tweet.User.profilePhoto" alt="">
            </router-link>

        </div>

        <div class="tweet__info">
            
            <div class="tweet__top">
                <router-link :to="{name: 'user-detail', params: {id: tweet.UserId}}" class="tweet__top--prim">{{tweet.User.name}}</router-link>
                <router-link :to="{name: 'user-detail', params: {id: tweet.UserId}}" class="tweet__top--sec">@{{tweet.User.account}}</router-link>
                <span class="tweet__top--sec">．{{tweet.createdAt}}</span>
            </div>
            <div class="tweet__info--content">
                {{tweet.description}}
            </div>
            <div class="tweet__bottom">
                <router-link to="/123" class="tweet__bottom--icon">
                    <img src="../assets/images/tweet_reply.svg" alt="">
                    <span class="montserrat-font">{{tweet.repliesCount}}</span>
                </router-link>
                
                <div @click.stop.prevent="addLike(tweet.id)" class="tweet__bottom--icon">
                    <img src="../assets/images/tweet_like.svg" alt="">
                    <span class="montserrat-font">{{tweet.likedCount}}</span>
                </div>
                <div @click.stop.prevent="deleteLike(tweet.id)" class="tweet__bottom--icon">
                    <img src="../assets/images/tweet_reply.svg" alt="">
                    <span class="montserrat-font">{{tweet.likedCount}}</span>
                </div>
                
            </div>
        </div>
    </router-link>
</template>

<script>
import tweetsAPI from '../apis/tweets.js'
import { Toast } from '../utils/helpers.js'

export default {
    props: {
        user: {
            type: Object,
        },
        initialTweet: {
            type: Object,
        },
    },
    data () {
        return {
            tweet: this.initialTweet,
        }
    },
    watch: {
        initialTweet (newValue) {
            console.log(newValue)
            this.tweet = {
                ...this.tweet,
                ...newValue
            }
        },
        user (newValue) {
            this.user = {
                ...this.user,
                ...newValue
            }
        },
    },
    methods: {
        async addLike(tweet_id){
            try {
                const response = await tweetsAPI.addLike({tweet_id})
                console.log(response)
            }
            catch (error) {
                console.log(error.message)
                Toast.fire({
                    icon: 'error',
                    title: `目前無法操作,請稍後再試`,
                })
            }
        },
        async deleteLike(tweet_id){
            try {
                const response = await tweetsAPI.deleteLike({tweet_id})
                console.log(response)
            }
            catch (error) {
                console.log(error.message)
                Toast.fire({
                    icon: 'error',
                    title: `目前無法操作,請稍後再試`,
                })
            }
        }
    }
}
</script>