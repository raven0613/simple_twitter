<template>
    <div class="tweet-detail">

        <div v-if="!isLoading" class="tweet-detail__user">
            <div class="tweet__avatar">
                <router-link :to="{name: 'user-detail', params: {id: tweet.UserId}, query: {tab: 'tweet'}}" class="tweet__avatar--photo" >
                    <img :src="tweet.User.profilePhoto" alt="">
                </router-link>
            </div>
            <div class="tweet-detail__user--name">
                <router-link :to="{name: 'user-detail', params: {id: tweet.UserId}, query: {tab: 'tweet'}}">{{tweet.User.name}}</router-link>
                <router-link :to="{name: 'user-detail', params: {id: tweet.UserId}, query: {tab: 'tweet'}}">@{{tweet.User.account}}</router-link>
            </div>
        </div>

        <div class="tweet-detail__content">
            {{tweet.description}}
        </div>
        
        <div class="tweet-detail__time">
            {{tweet.createdAt | fromNow}}
        </div>
        <div class="tweet-detail__info">
            <div class="tweet-detail__info--reply">
                <span class="montserrat-font">{{tweet.replyCounts}}</span> 
                <span> 回覆</span>
            </div>
            <div class="tweet-detail__info--like">
                <span class="montserrat-font">{{tweet.likeCounts}}</span> 
                <span> 喜歡次數</span>
            </div>
        </div>
        <div class="tweet-detail__icons">
            <div @click.stop.prevent="toggleModal">
                <img src="../assets/images/tweet_reply.svg" alt="">
            </div>
        
            <div v-if="!tweet.isLiked" @click.stop.prevent="addLike(tweet.id)">
                <img src="../assets/images/tweet_like.svg" alt="">
            </div>
            <div v-else @click.stop.prevent="deleteLike(tweet.id)" >
                <img src="../assets/images/tweet_liked.svg" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import tweetsAPI from '../apis/tweets.js'
import { Toast, innerHtml } from '../utils/helpers.js'
import {
  showDescriptionFilter,
  fromNowFilter
} from "../utils/mixins";

export default {
    props: {
        initialData: {
            type: Object,
            required: true
        },
        iniIsModalToggled: {
            type: Boolean,
        }
    },
    mixins: [showDescriptionFilter, fromNowFilter],
    data() {
        return {
            tweet: this.initialData,
            isModalToggled: this.iniIsModalToggled,
            isLoading: true,
            isProcessing: false
        }
    },
    watch: {
        initialData: {
            handler: function (newValue) {
                this.tweet = {
                    ...newValue
                }
                this.isLoading = false
            },
            immediate: true
        }
    },
    methods: {
        toggleModal () {
            this.isModalToggled = true
            this.$emit("after-toggle-modal", this.isModalToggled)
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