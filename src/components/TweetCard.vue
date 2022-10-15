<template>
    <router-link :to="{ name: 'tweet-detail', params: { id: tweet.id } }" class="tweet__container">

        <div class="tweet__avatar">
            <router-link :to="{name: 'user-detail', params: {id: tweet.UserId}, query: {tab: 'tweet'}}" class="tweet__avatar--photo" >
                <img :src="tweet.User.profilePhoto | emptyImage" alt="">
            </router-link>

        </div>

        <div class="tweet__info">
            
            <div class="tweet__top">
                <router-link :to="{name: 'user-detail', params: {id: tweet.UserId}, query: {tab: 'tweet'}}" class="tweet__top--prim">{{tweet.User.name}}</router-link>
                <router-link :to="{name: 'user-detail', params: {id: tweet.UserId}, query: {tab: 'tweet'}}" class="tweet__top--sec">@{{tweet.User.account}}</router-link>
                <span class="tweet__top--sec">．{{tweet.createdAt | fromNow}}</span>
            </div>
            <div class="tweet__info--content">
                {{tweet.description}}
            </div>
            <div class="tweet__bottom">
                <div @click.stop.prevent="toggleModal"              class="tweet__bottom--icon">
                    <img src="../assets/images/tweet_reply.svg" alt="">
                    <span class="montserrat-font">{{tweet.replyCounts}}</span>
                </div>
                
                <div v-if="!tweet.isLiked" @click.stop.prevent="addLike(tweet.id)" class="tweet__bottom--icon">
                    <img src="../assets/images/tweet_like.svg" alt="">
                    <span class="montserrat-font">{{tweet.likeCounts}}</span>
                </div>
                <div v-else 
                @click.stop.prevent="deleteLike(tweet.id)"
                class="tweet__bottom--icon">
                    <img src="../assets/images/tweet_liked.svg" alt="">
                    <span class="montserrat-font">{{tweet.likeCounts}}</span>
                </div>
                
            </div>
        </div>
    </router-link>
</template>

<script>
import tweetsAPI from '../apis/tweets.js'
import { Toast, innerHtml } from '../utils/helpers.js'
import {
  showDescriptionFilter,
  fromNowFilter,
  emptyImageFilter
} from "../utils/mixins";

export default {
    props: {
        initialTweet: {
            type: Object,
        },
        iniIsModalToggled: {
            type: Boolean,
        }
    },
    mixins: [showDescriptionFilter, fromNowFilter, emptyImageFilter],
    data () {
        return {
            tweet: this.initialTweet,
            isModalToggled: this.iniIsModalToggled,
            isProcessing: false
        }
    },
    watch: {
        initialTweet (newValue) {
            this.tweet = {
                ...this.tweet,
                ...newValue
            }
        },
    },
    methods: {
        toggleModal () {
            this.isModalToggled = true
            this.$emit("after-toggle-modal", this.isModalToggled)
            //把點到的推文id傳回Main
            this.$emit("after-clicked-reply", this.tweet)
        },
        async addLike(tweet_id){
            try {
                if (this.isProcessing) return
                this.isProcessing = true
                const response = await tweetsAPI.addLike({tweet_id})
                console.log(response)
                this.tweet = {
                    ...this.tweet,
                    isLiked: true,
                    likeCounts: this.tweet.likeCounts + 1
                }
                this.isProcessing = false
            }
            catch (error) {
                console.log(error.message)
                this.isProcessing = false
                Toast.fire({
                    html: innerHtml('目前無法操作','error')
                })
            }
        },
        async deleteLike(tweet_id){
            try {
                if (this.isProcessing) return
                this.isProcessing = true
                const response = await tweetsAPI.deleteLike({tweet_id})
                console.log(response)
                this.tweet = {
                    ...this.tweet,
                    isLiked: false,
                    likeCounts: this.tweet.likeCounts - 1
                }
                this.isProcessing = false
            }
            catch (error) {
                console.log(error.message)
                this.isProcessing = false
                Toast.fire({
                    html: innerHtml('目前無法操作','error')
                })
            }
        }
    }
}
</script>